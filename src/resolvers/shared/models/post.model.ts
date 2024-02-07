import { Field, ID, ObjectType } from "@nestjs/graphql"
import UserModel from "./user.model"
import CourseModel from "./course.model"
import PostContentEntity from "src/database/mysql/post-content.entity"

@ObjectType()
export default class PostModel {
  @Field(() => ID)
  	postId: string

  @Field(() => String)
  	title: string

  @Field(() => CourseModel)
  	course: CourseModel

  @Field(() => [PostContentEntity])
  	postContents: PostContentEntity[]

  @Field(() => UserModel)
  	creator: UserModel
}
