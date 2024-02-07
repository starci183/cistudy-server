import { IAuthInput } from "@common"
import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, Length } from "class-validator"

export class CreateLectureData {
    @IsUUID("4")
    @ApiProperty()
    	sectionId: string

    @Length(200)
    @ApiProperty()
    	title: string
}
export class CreateLectureInput implements IAuthInput<CreateLectureData> {
	@IsUUID("4")
		userId: string
	data: CreateLectureData
	files: Express.Multer.File[]
}