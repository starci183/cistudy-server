import { IAuthInput } from "@common"
import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, Length } from "class-validator"

export class CreateSectionData {
  @IsUUID("4")
  @ApiProperty()
  	courseId: string

  @Length(200)
  @ApiProperty()
  	title: string
}

export class CreateSectionInput implements IAuthInput<CreateSectionData> {
	@IsUUID("4")
		userId: string
	data: CreateSectionData
	files?: Express.Multer.File[]
}