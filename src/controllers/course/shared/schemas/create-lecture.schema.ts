import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const createLectureSchema : SchemaObject = {
	type: "object",
	properties: {
		data: {
			type: "object",
			properties: {
				title: {
					type: "string",
				},
				sectionId: {
					type: "string"
				}
			},
		},
		files: {
			type: "array",
			items: {
				type: "string",
				format: "binary"
			},
		},
	}
}