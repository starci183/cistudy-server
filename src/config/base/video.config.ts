export default () => ({
	videoInfos,
	videoNames
})

type VideoName = "1080.mp4" | "720.mp4" | "480.mp4" | "360.mp4" | "240.mp4"
interface VideoProps {
    resolution: string,
    audioBitrate:string,
    audioFrequency: number,
    audioChannels: number,
    maxRate: string,
    bufSize: string
}

const videoInfos: Record<VideoName, VideoProps> = {
	"1080.mp4": {
		resolution: "1920x1080",
		audioBitrate: "128k",
		audioFrequency: 44100,
		audioChannels: 2,
		maxRate: "5000k",
		bufSize: "10000k"
	},
	"720.mp4": {
		resolution: "1280x720",
		audioBitrate: "128k",
		audioFrequency: 44100,
		audioChannels: 2,
		maxRate: "2500k",
		bufSize: "5000k"
	},
	"480.mp4": {
		resolution: "854x480",
		audioBitrate: "96k",
		audioFrequency: 44100,
		audioChannels: 2,
		maxRate: "1250k",
		bufSize: "2500k"
	},
	"360.mp4": {
		resolution: "640x360",
		audioBitrate: "96k",
		audioFrequency: 44100,
		audioChannels: 2,
		maxRate: "900k",
		bufSize: "1800k"
	},
	"240.mp4": {
		resolution: "320x240",
		audioBitrate: "64k",
		audioFrequency: 22050,
		audioChannels: 1,
		maxRate: "625k",
		bufSize: "1250k" 
	}
}

const videoNames = Object.keys(videoInfos) as (keyof typeof videoInfos)[]