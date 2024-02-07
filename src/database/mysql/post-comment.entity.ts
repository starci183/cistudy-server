import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import PostEntity from "./post.entity"
import PostCommentContentEntity from "./post-comment-content.entity"
import UserEntity from "./user.entity"
import PostCommentLikeEntity from "./post-comment-like.entity"

@Entity("post_comment")
export default class PostCommentEntity {
  @PrimaryGeneratedColumn("uuid")
  	postCommentId: string

  @Column({ type: "uuid", length: 36 })
  	userId: string

  @Column({ type: "uuid", length: 36 })
  	postId: string

  @ManyToOne(
  	() => PostCommentEntity,
  	(postComment) => postComment.childComments,
  )
  @JoinColumn({ name: "fatherCommentId" })
  @Column({ type: "uuid", default: null, length: 36 })
  	fatherCommentId: string

  @ManyToOne(() => PostEntity, (post) => post.postComments)
  @JoinColumn({ name: "postId" })
  	post: PostEntity

  @ManyToOne(() => UserEntity, (user) => user.postComments)
  @JoinColumn({ name: "userId" })
  	user: UserEntity

  @OneToMany(
  	() => PostCommentContentEntity,
  	(postCommentContent) => postCommentContent.postComment,
  	{ cascade: true },
  )
  	postCommentContents: Partial<PostCommentContentEntity>[]

  @OneToMany(
  	() => PostCommentLikeEntity,
  	(postCommentLike) => postCommentLike.postComment,
  )
  	postCommentLikes: PostCommentLikeEntity[]

  @OneToMany(
  	() => PostCommentEntity,
  	(postComment) => postComment.fatherCommentId, { cascade: true }
  )
  	childComments: PostCommentEntity[]
}
