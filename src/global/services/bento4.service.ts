import { Injectable } from "@nestjs/common"
import { join } from "path"
import { exec } from "child_process"
import { pathsConfig } from "@config"
import { getEnvValue } from "@utils"

const BINARY_PATH = join(
    process.cwd(),
    "tools",
    getEnvValue({
        development: "Bento4-Windows",
        production: "Bento4-Docker",
    }),
    "bin",
)

@Injectable()
export default class Bento4Service {
    private async execute(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(
                command,
                {
                    cwd: BINARY_PATH,
                    shell: getEnvValue({
                        development: "powershell.exe",
                    }),
                },
                (error, stdout, stderr) => {
                    if (error) {
                        reject(error)
                    }
                    if (stderr) {
                        reject(stderr)
                    }
                    resolve(stdout)
                },
            )
        })
    }

    async checkFragments(assetId: string, videoName: string) {
        const videoPath = join(
            pathsConfig().processMpegDashTasksDirectory,
            assetId,
            videoName,
        )

        const execResult = await this.execute(
            `${getEnvValue({ development: "./mp4info.exe", production: "./mp4info" })} "${videoPath}"`,
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

        const execResult = await this.execute(
            `${getEnvValue({ development: "./mp4fragment.exe", production: "./mp4fragment" })}  --fragment-duration 4000 "${videoPath}" "${outputDir}"`,
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

        const execResult = await this.execute(
            `${getEnvValue({ development: "./mp4dash.bat", production: "sh ./mp4dash" })} --mpd-name manifest.mpd ${line} -o "${outputDir}" --use-segment-timeline --subtitles --force`,
        )
        const lines = execResult.split("\n")

        for (const line in lines) {
            const lineData = lines[line].toString()

            if (lineData.includes("ERROR"))
                throw new Error("Line data includes error.")
        }
    }
}
