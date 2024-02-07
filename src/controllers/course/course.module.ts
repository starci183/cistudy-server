import { Module } from "@nestjs/common"
import CourseController from "./course.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
	SessionMySqlEntity,
	UserMySqlEntity,
	PostMySqlEntity,
	CourseMySqlEntity,
	EnrolledInfoMySqlEntity,
	SectionMySqlEntity,
	LectureMySqlEntity,
	ResourceMySqlEntity,
	PostContentMySqlEntity,
	PostCommentMySqlEntity,
	PostCommentContentMySqlEntity,
	PostLikeMySqlEntity,
	PostCommentLikeMySqlEntity,
} from "@database"
import CourseService from "./course.service"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			SessionMySqlEntity,
			UserMySqlEntity,
			PostMySqlEntity,
			CourseMySqlEntity,
			EnrolledInfoMySqlEntity,
			SectionMySqlEntity,
			LectureMySqlEntity,
			ResourceMySqlEntity,
			PostContentMySqlEntity,
			PostCommentMySqlEntity,
			PostCommentContentMySqlEntity,
			PostLikeMySqlEntity,
			PostCommentLikeMySqlEntity,
		]),
	],
	controllers: [CourseController],
	providers: [CourseService],
})
export default class CourseModule {}
