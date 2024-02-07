import { Module } from "@nestjs/common"
import { CourseModule } from "./course"
import { PostModule } from "./post"

@Module({
	imports: [CourseModule, PostModule],
})
export default class ResolversModule {}
