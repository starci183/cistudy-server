import { Module } from "@nestjs/common"

import { TypeOrmModule } from "@nestjs/typeorm"
import {
	CourseMySqlEntity,
	EnrolledInfoMySqlEntity,
	LectureMySqlEntity,
	PostCommentContentMySqlEntity,
	PostCommentLikeMySqlEntity,
	PostCommentMySqlEntity,
	PostContentMySqlEntity,
	PostLikeMySqlEntity,
	PostMySqlEntity,
	ResourceMySqlEntity,
	SectionMySqlEntity,
	SessionMySqlEntity,
	UserMySqlEntity,
} from "@database"
import { AuthModule } from "./auth"
import { CourseModule } from "./course"
import { JwtStrategy } from "./shared"

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
			PostCommentLikeMySqlEntity
		]),
		AuthModule,
		CourseModule,
	],
	controllers: [],
	providers: [
		JwtStrategy
	],
})
export default class ControllersModule {}
