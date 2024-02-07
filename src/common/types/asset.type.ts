export type Metadata = {
    assetId: string,
    filename: string
}

export type MinimalFile = {
    filename: string,
    fileBody: string | Buffer
}

export type FileAndSubdirectory = {
    file: MinimalFile,
    subdirectory?: string
}

export type Files = {
    files: Array<Express.Multer.File>
}