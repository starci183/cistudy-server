import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import UserEntity from "./user.entity"
import PostCommentEntity from "./post-comment.entity"

@Entity("post_comment_like")
export default class PostCommentLikeEntity {
  @PrimaryGeneratedColumn("uuid")
  	postCommentLikeId: string

  @Column({ type: "uuid", length: 36 })
  	userId: string

  @Column({ type: "uuid", length: 36 })
  	postId: string

  @Column({
  	type: "timestamp",
  	default: () => "CURRENT_TIMESTAMP",
  	onUpdate: "CURRENT_TIMESTAMP",
  })
  	createdAt: Date

  @ManyToOne(() => UserEntity, (user) => user.postLikes)
  @JoinColumn({ name: "userId" })
      	user: UserEntity

  @ManyToOne(() => PostCommentEntity, (postComment) => postComment.postCommentLikes)
  @JoinColumn({ name: "postId" })
  	postComment: PostCommentEntity
}