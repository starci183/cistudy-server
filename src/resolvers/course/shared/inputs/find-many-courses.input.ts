/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, ObjectType } from "@nestjs/graphql"

@InputType()
export class CourseFilterModel {
  @Field(() => String, { nullable: true })
  	category: string
}

@InputType()
export class FindManyCoursesInput {
  @Field(() => CourseFilterModel, { nullable: true })
  	filter: CourseFilterModel
}

