import { Resolver, Query, Args } from "@nestjs/graphql"
import { FindManyPostsInput, FindOnePostInput } from "./shared"
import PostService from "./post.service"
import { PostMySqlEntity } from "@database"

@Resolver(() => PostMySqlEntity)
export default class PostResolvers {
	constructor(
    private readonly postService: PostService,
	) {}
  @Query(() => PostMySqlEntity)
	async findOnePost(@Args("input") args: FindOnePostInput) {
		return this.postService.findOnePost(args)
	}

  @Query(() => [PostMySqlEntity])
  async findManyPosts(@Args("input") args: FindManyPostsInput) {
  	return this.postService.findManyPosts(args)
  }
}
