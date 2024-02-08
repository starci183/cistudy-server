import { Injectable } from "@nestjs/common"
import { join } from "path"
import { pathsConfig } from "@config"
import ShellService from "./shell.service"

@Injectable()
export default class Bento4Service {
    constructor(private readonly shellService: ShellService) {}

    async checkFragments(assetId: string, videoName: string) {
        const videoPath = join(
            pathsConfig().processMpegDashTasksDirectory,
            assetId,
            videoName,
        )

        const execResult = await this.shellService.execute(
            `mp4info "${videoPath}"`,
        )
        const lines = execResult.split("\n")

        for (const line in lines) {
            const lineData = lines[line].toString()

            if (lineData.includes("fragments:  yes")) {
                return false
            }

            if (lineData.includes("fragments:  no")) {
                return true
            }

            if (lineData.includes("No movie found in the file")) {
                throw new Error("No movie found in the file.")
            }
        }
    }

    async fragmentVideo(assetId: string, videoName: string) {
        const videoPath = join(
            pathsConfig().processMpegDashTasksDirectory,
            assetId,
            videoName,
        )
        const outputDir = join(
            pathsConfig().processMpegDashTasksDirectory,
            assetId,
            `${videoName}_fragmented`,
        )

        const execResult = await this.shellService.execute(
            `mp4fragment --fragment-duration 4000 "${videoPath}" "${outputDir}"`,
        )

        const lines = execResult.split("\n")

        for (const line in lines) {
            const lineData = line.toString()

            if (lineData.includes("ERROR"))
                throw new Error("Line data includes ERROR.")
        }
    }

    async generateMpegDashManifestFromFragments(
        assetId: string,
        fragmentedVideoNames: string[],
    ) {
        const fragmentedPaths = fragmentedVideoNames.map((videoName) =>
            join(
                pathsConfig().processMpegDashTasksDirectory,
                assetId,
                `${videoName}_fragmented`,
            ),
        )
        const line = fragmentedPaths.map((path) => `"${path}"`).join(" ")

        //output same file
        const outputDir = join(
            pathsConfig().processMpegDashTasksDirectory,
            assetId,
        )

        const execResult = await this.shellService.execute(
            `mp4dash --mpd-name manifest.mpd ${line} -o "${outputDir}" --use-segment-timeline --subtitles --force`,
        )
        const lines = execResult.split("\n")

        for (const line in lines) {
            const lineData = lines[line].toString()

            if (lineData.includes("ERROR"))
                throw new Error("Line data includes error.")
        }
    }
}
