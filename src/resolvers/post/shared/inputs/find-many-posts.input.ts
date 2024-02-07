import { Field, InputType, Int } from "@nestjs/graphql"
import { IsInt } from "class-validator"
  
@InputType()
export default class FindManyPostsInput {
  @Field(() => String)
  	courseId: string
  @Field(() => Int)
  @IsInt()
  	take: number
  @Field(() => Int)
  @IsInt()
  	skip: number
}
