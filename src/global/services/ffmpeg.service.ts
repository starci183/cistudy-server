import { Injectable } from "@nestjs/common"
import ffmpeg from "fluent-ffmpeg"
import { join } from "path"
import { pathsConfig, videoConfig } from "@config"

@Injectable()
export default class FfmpegService {
    private encodeVideo(profile: EncodeProfile) {
        return new Promise((resolve, reject) => {
            ffmpeg(profile.inputPath)
                .videoCodec("libx264")
                .videoBitrate(profile.maxRate)
                .size(profile.resolution)
                .audioCodec("aac")
                .format("mp4")
                .audioBitrate(profile.audioBitrate)
                .audioFrequency(profile.audioFrequency)
                .audioChannels(profile.audioChannels)
                .addOutputOptions([
                    "-profile:v main",
                    "-level 4.0",
                    "-crf 22",
                    "-r 25",
                    "-keyint_min 25",
                    "-g 50",
                    "-pix_fmt yuv420p",
                    "-sc_threshold 0",
                    "-movflags +faststart",
                    `-maxrate ${profile.maxRate}`,
                    `-bufsize ${profile.bufSize}`
                ])
                .save(profile.outputPath)
                .on("end", resolve)
                .on("error", reject)
        })
    }

    async encodeAtMultipleBitrates(assetId: string, videoName: string) {
        const videoPath = join(pathsConfig().processMpegDashTasksDirectory, assetId, videoName)
        const outputDir = join(pathsConfig().processMpegDashTasksDirectory, assetId)
        const videoInfos = videoConfig().videoInfos
        const profiles: EncodeProfile[] = [
            {
                inputPath: videoPath,
                outputPath: join(outputDir, "1080.mp4"),
                ...videoInfos["1080.mp4"]
            },
            {
                inputPath: videoPath,
                outputPath: join(outputDir, "720.mp4"),
                ...videoInfos["720.mp4"]
            },
            {
                inputPath: videoPath,
                outputPath: join(outputDir, "480.mp4"),
                ...videoInfos["480.mp4"]
            },
            {
                inputPath: videoPath,
                outputPath: join(outputDir, "360.mp4"),
                ...videoInfos["360.mp4"]
            },
            {
                inputPath: videoPath,
                outputPath: join(outputDir, "240.mp4"),
                ...videoInfos["240.mp4"]
            },
        ]
        const promises: Promise<void>[] = []
        for (const profile of profiles) {
            const promise = async () => {
                await this.encodeVideo(profile)
            }
            promises.push(promise())
        }

        await Promise.all(promises)
    }
}

interface EncodeProfile {
    inputPath: string;
    outputPath: string;
    resolution: string;
    audioBitrate: string;
    audioFrequency: number;
    audioChannels: number;
    maxRate: string,
    bufSize: string,
}