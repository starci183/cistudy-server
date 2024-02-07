export default () => ({
	extnameToContentType
})


type Extname = ".mpd" | ".json" | ".mkv" | ".mp4"

const extnameToContentType: Record<Extname, string> = {
	".mpd": "application/dash+xml",
	".json": "application/json",
	".mkv": "video/x-matroska",
	".mp4": "video/mp4"
}