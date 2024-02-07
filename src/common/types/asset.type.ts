export type Metadata = {
    assetId: string,
    filename: string
}

export type MinimalFile = {
    filename: string,
    fileBody: string | Buffer
}

export const isMinimalFile = (value: unknown): value is MinimalFile => {
    if (typeof value !== "object" || value === null) {
        return false
    }
    if (!("filename" in value) || !("fileBody" in value)) {
        return false
    }
    if (typeof value.filename !== "string" || typeof value.fileBody !== "string") {
        return false
    }
    return true
}

export type FileAndSubdirectory = {
    file: MinimalFile | Express.Multer.File,
    subdirectory?: string
}

export type Files = {
    files: Array<Express.Multer.File>
}