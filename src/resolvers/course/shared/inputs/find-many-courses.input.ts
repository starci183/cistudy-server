import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class CourseFilterInput {
  @Field(() => String, { nullable: true })
  category: string
}

@InputType()
export class FindManyCoursesInput {
  @Field(() => CourseFilterInput, { nullable: true })
  filter: CourseFilterInput
}

