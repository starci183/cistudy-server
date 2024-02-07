import { extnameConfig, servicesConfig } from "@config"
import { Injectable, OnModuleInit } from "@nestjs/common"
import { createClient } from "@supabase/supabase-js"
import StorageFileApi from "@supabase/storage-js/dist/module/packages/StorageFileApi"
import { FileAndSubdirectory, Metadata, MinimalFile } from "@common"
import { v4 as uuid4, validate as validateUuid4 } from "uuid"
import { extname, join, basename } from "path"

const METADATA_FILE_NAME = "metadata.json"

@Injectable()
export default class SupabaseService implements OnModuleInit {
	constructor() { }

	private bucket: StorageFileApi
	onModuleInit() {
		const supabase = createClient(
			servicesConfig().supabase.url,
			servicesConfig().supabase.key,
		)
		this.bucket = supabase.storage.from("cistudy")
	}

	public async get(
		assetIdOrPath: string
	): Promise<MinimalFile> {
		if (validateUuid4(assetIdOrPath))
			return this.getFromAssetId(assetIdOrPath)
		return this.getFromAssetPath(assetIdOrPath)
	}

	private async getFromAssetId(
		assetId: string
	): Promise<MinimalFile> {
		const { data } = await this.bucket.download(join(assetId, "metadata.json"))
		const text = await data.text()
		const { filename } = JSON.parse(text) as Metadata
		const { data: fileData } = await this.bucket.download(join(assetId, filename))
		const arrayBuffer = await fileData.arrayBuffer()
		return {
			filename,
			fileBody: Buffer.from(arrayBuffer),
		}
	}

	private async getFromAssetPath(
		assetPath: string
	): Promise<MinimalFile> {
		const filename = basename(assetPath)

		const { data } = await this.bucket.download(assetPath)
		const arrayBuffer = await data.arrayBuffer()

		return {
			filename,
			fileBody: Buffer.from(arrayBuffer)
		}
	}

	private async uploadMetadata(metadata: Metadata) {
		const { assetId } = metadata
		await this.bucket.upload(
			join(assetId, METADATA_FILE_NAME),
			JSON.stringify(metadata),
			{
				upsert: true,
				contentType: extnameConfig().extnameToContentType[extname(METADATA_FILE_NAME)]
			},
		)
	}

	async upload(
		file: Express.Multer.File,
	): Promise<Metadata> {
		const assetId = uuid4()
		const { originalname: filename, buffer } = file

		await this.bucket.upload(join(assetId, filename), buffer, {
			upsert: true,
			contentType: extnameConfig().extnameToContentType[extname(filename)]
		})

		const metadata: Metadata = {
			assetId,
			filename,
		}

		await this.uploadMetadata(metadata)
		return metadata
	}

	async update(
		assetId: string,
		fileAndSubdirectories: Array<FileAndSubdirectory> = [],
		metadata?: Metadata
	) {
		for (const { file, subdirectory } of fileAndSubdirectories) {
			const { filename, fileBody } = file
			const dir = subdirectory ? join(assetId, subdirectory) : assetId
			await this.bucket.upload(join(dir, filename), fileBody, {
				upsert: true,
				contentType: extnameConfig().extnameToContentType[extname(filename)]
			})
		}

		if (metadata) {
			await this.uploadMetadata(metadata)
		}
	}
}

