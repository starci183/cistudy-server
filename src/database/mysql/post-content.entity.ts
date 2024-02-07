import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"

import PostEntity from "./post.entity"
import { ContentType } from "@common"
import { Field, ID, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
@Entity("post_content")
export default class PostContentEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  	postContentId: string

  @Field(() => Int)
  @Column({ type: "int", default: 0 })
  	index: number

  @Field(() => String)
  @Column({ type: "varchar", length: 1000 })
  	content: string

  @Field(() => String)
  @Column({ type: "enum", enum: ContentType, default: ContentType.Text })
  	contentType: ContentType

  @Field(() => String)
  @Column({ type: "uuid", length: 36 })
  	postId: string

  @Field(() => [PostEntity])
  @ManyToOne(() => PostEntity, (post) => post.postContents)
  @JoinColumn({ name: "postId" })
  	post: PostEntity
}
