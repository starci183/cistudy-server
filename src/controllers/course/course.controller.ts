import {
	Controller,
	Post,
	UseInterceptors,
	UseGuards,
	UploadedFiles,
	Body,
} from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger"
import { CreateCourseData, createCourseSchema, CreateLectureData, createLectureSchema, CreateSectionData } from "./shared"
import { UserId, AuthInterceptor, JwtAuthGuard, DataFromBody } from "../shared"
import { UserMySqlEntity } from "@database"
import { Files } from "@common"
import CourseService from "./course.service"
import { FileFieldsInterceptor } from "@nestjs/platform-express"

@ApiTags("Course")
@ApiQuery({
	name: "clientId",
	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
})
@Controller("api/course")
export default class CourseController{
	constructor(private readonly courseService: CourseService) { }

    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @ApiBody({ schema: createCourseSchema })
    @Post("create-course")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        AuthInterceptor<UserMySqlEntity>,
        FileFieldsInterceptor([{ name: "files", maxCount: 2 }]),
    )
	async createCourse(
        @UserId() userId: string,
        @DataFromBody() data: CreateCourseData,
        @UploadedFiles() { files }: Files,
	) {
		return this.courseService.createCourse({
			userId,
			data,
			files,
		})
	}

    @ApiBearerAuth()
    @Post("create-section")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        AuthInterceptor<UserMySqlEntity>,
    )
    async createSection(
        @UserId() userId: string,
        @Body() body: CreateSectionData
    ) {
    	return this.courseService.createSection({
    		userId,
    		data: body
    	})
    }

    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @ApiBody({ schema: createLectureSchema })
    @Post("create-lecture")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        AuthInterceptor<UserMySqlEntity>,
        FileFieldsInterceptor([{ name: "files", maxCount: 1 }]),
    )
    async createLecture(
        @UserId() userId: string,
        @DataFromBody() data: CreateLectureData,
        @UploadedFiles() { files }: Files,
    ) {     
    	return this.courseService.createLecture({
    		userId,
    		data,
    		files
    	}) 
    }
}
