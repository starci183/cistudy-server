import { Field, ID, InputType } from "@nestjs/graphql"

@InputType()
export class FindOneCourseInput {
  @Field(() => ID)
  	courseId: string
}
