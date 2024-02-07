import { PostMySqlEntity } from "@database"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { FindManyPostsInput, FindOnePostInput } from "./shared"

@Injectable()
export default class PostService {
	constructor(
    @InjectRepository(PostMySqlEntity)
    private readonly postMySqlRepository: Repository<PostMySqlEntity>,
	) {}

	async findOnePost(args: FindOnePostInput): Promise<PostMySqlEntity> {
		return await this.postMySqlRepository.findOneBy(args)
	}

	async findManyPosts(args: FindManyPostsInput): Promise<PostMySqlEntity[]> {
		const founds = await this.postMySqlRepository.findAndCount({
			where: {
				courseId: args.courseId,
			},
			take: args.take,
			skip: args.skip,
			relations: {
				postContents: true,
				creator: true,
				course: true,
			},
		})
		return founds[0]
	}
}
