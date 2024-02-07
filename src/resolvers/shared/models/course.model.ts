import { Field, Float, ID, ObjectType } from "@nestjs/graphql"
import { VerifiedStatus } from "@common"
import UserModel from "./user.model"

@ObjectType()
export default class CourseModel {
  @Field(() => ID)
  	courseId: string

  @Field(() => String)
  	title: string

  @Field(() => String, { nullable: true })
  	thumbnailId: string

  @Field(() => String)
  	description: string

  @Field(() => Float, { defaultValue: 0 })
  	price: number

  @Field(() => VerifiedStatus, { nullable: true })
  	verifiedStatus: VerifiedStatus

  @Field(() => Boolean, { defaultValue: true })
  	isDraft: boolean

  @Field(() => UserModel)
  	creator: UserModel

  @Field(() => Boolean, { defaultValue: false })
  	isDeleted: boolean

  @Field(() => String, { nullable: true })
  	previewVideoId: string

  @Field(() => String, { nullable: true })
  	targets: string

  @Field(() => String, { nullable: true })
  	includes: string
}
