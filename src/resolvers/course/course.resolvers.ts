import { Resolver, Query, Args } from "@nestjs/graphql"
import { FindOneCourseInput, FindManyCoursesInput } from "./shared"
import CourseService from "./course.service"
import { CourseMySqlEntity } from "@database"

@Resolver(() => CourseMySqlEntity)
export default class CourseResolvers {
	constructor(
    private readonly courseService: CourseService,
	) {}
  @Query(() => CourseMySqlEntity)
	async findOneCourse(@Args("input") args: FindOneCourseInput) {
		return await this.courseService.findOneCourse(args)
	}

	@Query(() => [CourseMySqlEntity])
  async findManyCourses(@Args("input", { nullable: true }) args: FindManyCoursesInput) {
  	return await this.courseService.findManyCourses(args)
  }
}
