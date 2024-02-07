import { Injectable } from "@nestjs/common"
import { join } from "path"
import { exec } from "child_process"

const BINARY_PATH = "./tools/Bento4-SDK/bin"

@Injectable()
export default class Bento4Service {
	private async execute(command: string): Promise<string> {
		return new Promise((resolve, reject) => {
			exec(command, {
				cwd: BINARY_PATH,
				shell: process.env.ComSpec
			}, (error, stdout, stderr) => {
				if (error) {
					reject(error)
				}
				if (stderr) {
					reject(stderr)
				}
				resolve(stdout)
			})
		})
	}

	async checkFragments(assetId: string, videoName: string) {
		const videoPath = join(process.cwd(), "tasks", assetId, videoName)

		const execResult = await this.execute(`mp4info.exe "${videoPath}"`)
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
		const videoPath = join(process.cwd(), "tasks", assetId, videoName)
		const outputDir = join(
			process.cwd(),
			"tasks",
			assetId,
			`${videoName}_fragmented`,
		)

		const execResult = await this.execute(
			`mp4fragment.exe --fragment-duration 4000 "${videoPath}" "${outputDir}"`,
		)

		const lines = execResult.split("\n")

		for (const line in lines) {
			const lineData = line.toString()

			if (lineData.includes("ERROR"))
				throw new Error("Line data includes ERROR.")
		}
	}

	async generateMpegDashManifestFromFragments(assetId: string, fragmentedVideoNames: string[]) {
		const fragmentedPaths = fragmentedVideoNames.map((videoName) =>
			join(process.cwd(), "tasks", assetId, `${videoName}_fragmented`),
		)
		const line = fragmentedPaths.map((path) => `"${path}"`).join(" ")

		//output same file
		const outputDir = join(process.cwd(), "tasks", assetId)

		const execResult = await this.execute(
			`mp4dash.bat --mpd-name manifest.mpd ${line} -o "${outputDir}" --use-segment-timeline --subtitles --force`,
		)
		const lines = execResult.split("\n")

		for (const line in lines) {
			const lineData = lines[line].toString()

			if (lineData.includes("ERROR"))
				throw new Error("Line data includes error.")
		}
	}
}