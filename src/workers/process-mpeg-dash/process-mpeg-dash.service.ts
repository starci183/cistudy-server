import { AnyFile, FileAndSubdirectory, Metadata, isMinimalFile } from "@common"
import { Injectable, Logger } from "@nestjs/common"
import { promises as fsPromise } from "fs"
import { basename, dirname, extname, join } from "path"
import { FfmpegService, Bento4Service, SupabaseService } from "@global"
import { pathsConfig, videoConfig } from "@config"
import { validate as validateUuidv4 } from "uuid"

const MANIFEST_FILE_NAME = "manifest.mpd"

@Injectable()
export default class ProcessMpegDashService {
    private readonly logger = new Logger(ProcessMpegDashService.name)
    constructor(
    private readonly supabaseService: SupabaseService,
    private readonly ffmegService: FfmpegService,
    private readonly bento4Service: Bento4Service,
    ) {}

    private validateVideoExtension(fileName: string): boolean {
        const allowedExtensions = [
            ".mp4",
            ".avi",
            ".mov",
            ".mkv",
            ".wmv",
            ".flv",
            ".webm",
        ]
        return allowedExtensions.includes(extname(fileName))
    }

    async createTask(file: AnyFile): Promise<Metadata> {
        const _isMinimalFile = isMinimalFile(file)
        const filename = _isMinimalFile ? file.filename : file.originalname
        const fileBody = _isMinimalFile ? file.fileBody : file.buffer
        if (!this.validateVideoExtension(filename))
            throw new Error("Invalid video file extension")
        const metadata = await this.supabaseService.upload(file)
        const dir = join(
            pathsConfig().processMpegDashTasksDirectory,
            metadata.assetId,
        )
        await fsPromise.mkdir(dir)
        await fsPromise.writeFile(join(dir, filename), fileBody)
        return metadata
    }

    private async uploadMpegDashManifestRecusive(
        path: string,
        fileAndSubdirectories: Array<FileAndSubdirectory> = [],
        sendPath?: string,
        insideNonRootDir: boolean = true,
    ) {
        const name = basename(path)
        const stat = await fsPromise.stat(path)
        if (stat.isDirectory()) {
            const isRoot = validateUuidv4(name)
            if (!insideNonRootDir || isRoot || name === "video" || name === "audio") {
                const childNames = await fsPromise.readdir(path)
                for (const childName of childNames) {
                    const childPath = join(path, childName)
                    const childSendPath = sendPath
                        ? join(sendPath, childName)
                        : childName
                    await this.uploadMpegDashManifestRecusive(
                        childPath,
                        fileAndSubdirectories,
                        childSendPath,
                        isRoot,
                    )
                }
            }
        } else {
            const isManifest = name === MANIFEST_FILE_NAME
            if (!insideNonRootDir || isManifest) {
                const fileBody = await fsPromise.readFile(path)
                fileAndSubdirectories.push({
                    file: {
                        filename: name,
                        fileBody,
                    },
                    subdirectory: !isManifest ? dirname(sendPath) : undefined,
                })
            }
        }
    }

    private async uploadMpegDashManifest(assetId: string) {
        const fileAndSubdirectories: Array<FileAndSubdirectory> = []
        const path = join(pathsConfig().processMpegDashTasksDirectory, assetId)
        await this.uploadMpegDashManifestRecusive(path, fileAndSubdirectories)
        await this.supabaseService.update(assetId, fileAndSubdirectories, {
            assetId,
            filename: MANIFEST_FILE_NAME,
        })
    }

    private async cleanUp(assetId: string) {
        const path = join(pathsConfig().processMpegDashTasksDirectory, assetId)
        await fsPromise.rm(path, { recursive: true })
    }

    async processVideo(metadata: Metadata) {
        const { assetId, filename } = metadata
        this.logger.verbose(`DOING TASK: ${assetId}`)
        this.logger.verbose("1/5. Encoding video at multiple bitrates...")
        await this.ffmegService.encodeAtMultipleBitrates(assetId, filename)

        this.logger.verbose("2/5. Fragmenting videos...")
        const promises: Array<Promise<void>> = []
        for (const videoName of videoConfig().videoNames) {
            const promise = async () => {
                const fragmentationRequired = await this.bento4Service.checkFragments(
                    assetId,
                    videoName,
                )
                if (fragmentationRequired) {
                    await this.bento4Service.fragmentVideo(assetId, videoName)
                }
            }
            promises.push(promise())
        }
        await Promise.all(promises)

        this.logger.verbose("3/5. Generating MPEG-DASH manifest...")
        await this.bento4Service.generateMpegDashManifestFromFragments(
            assetId,
            videoConfig().videoNames,
        )

        this.logger.verbose("4/5. Uploading...")
        await this.uploadMpegDashManifest(assetId)

        this.logger.verbose("5/5. Cleaning up...")
        await this.cleanUp(assetId)
    }
}
