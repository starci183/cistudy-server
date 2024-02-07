import { Resolver, Query, Args } from "@nestjs/graphql"
import { FindOneCourseInput, FindManyCoursesInput } from "./shared"
import { CourseModel } from "../shared"
import CourseService from "./course.service"

@Resolver(() => CourseModel)
export default class CourseResolvers {
	constructor(
    private readonly courseService: CourseService,
	) {}
  @Query(() => CourseModel)
	async findOneCourse(@Args("input") args: FindOneCourseInput) {
		return await this.courseService.findOneCourse(args)
	}

	@Query(() => [CourseModel])
  async findManyCourses(@Args("input", { nullable: true }) args: FindManyCoursesInput) {
  	return await this.courseService.findManyCourses(args)
  }
}
