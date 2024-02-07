import { UserKind, UserRole } from "@common"
import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
export default class UserModel {
  @Field(() => ID)
  	userId: string

  @Field(() => String)
  	email: string

  @Field(() => String, { nullable: true })
  	password: string

  @Field(() => String, { nullable: true })
  	avatarUrl: string

  @Field(() => String, { nullable: true })
  	phoneNumber: string

  @Field(() => Number, { nullable: true })
  	balance: number

  @Field(() => UserRole)
  	role: UserRole

  @Field(() => String, { nullable: true })
  	walletId: string

  @Field(() => String, { nullable: true })
  	firstName: string

  @Field(() => String, { nullable: true })
  	lastName: string

  @Field(() => Date, { nullable: true })
  	birthdate: Date

  @Field(() => Boolean)
  	verified: boolean

  @Field(() => UserKind)
  	kind: UserKind

  @Field(() => String, { nullable: true })
  	externalId: string
}