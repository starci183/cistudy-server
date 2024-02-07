import { IAuthInput } from "@common"
import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsUUID, Length } from "class-validator"

export class CreateCourseData {
    @Length(20)
    @ApiProperty()
    	title: string

    @Length(100)
    @ApiProperty()
    	description: string

    @IsNumber()
    @ApiProperty()
    	price: number
}

export class CreateCourseInput implements IAuthInput<CreateCourseData> {
    @IsUUID("4")
    	userId: string
    data: CreateCourseData
    files: Express.Multer.File[]
}