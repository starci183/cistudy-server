import { Resolver, Query, Args } from "@nestjs/graphql"
import { FindManyPostsInput, FindOnePostInput } from "./shared"
import { PostModel } from "../shared"
import PostService from "./post.service"

@Resolver(() => PostModel)
export default class PostResolvers {
	constructor(
    private readonly postService: PostService,
	) {}
  @Query(() => PostModel)
	async findOnePost(@Args("input") args: FindOnePostInput) {
		return this.postService.findOnePost(args)
	}

  @Query(() => [PostModel])
  async findManyPosts(@Args("input") args: FindManyPostsInput) {
  	return this.postService.findManyPosts(args)
  }
}
