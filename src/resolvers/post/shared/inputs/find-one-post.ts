import { Field, ID, InputType } from "@nestjs/graphql"

@InputType()
export default class FindOnePostInput {
  @Field(() => ID)
      postId: string
}
