import { Module } from "@nestjs/common"
import PostResolvers from "./post.resolvers"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
	PostMySqlEntity,
	PostLikeMySqlEntity,
	PostContentMySqlEntity,
	PostCommentMySqlEntity,
	PostCommentContentMySqlEntity,
	PostCommentLikeMySqlEntity,
} from "@database"
import PostService from "./post.service"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			PostMySqlEntity,
			PostLikeMySqlEntity,
			PostContentMySqlEntity,
			PostCommentMySqlEntity,
			PostCommentContentMySqlEntity,
			PostCommentLikeMySqlEntity,
		]),
	],
	providers: [PostResolvers, PostService],
})
export default class PostModule {}
