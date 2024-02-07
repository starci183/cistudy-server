import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import UserEntity from "./user.entity"
import PostEntity from "./post.entity"

@Entity("post_like")
export default class PostLikeEntity {
  @PrimaryGeneratedColumn("uuid")
  	postLikeId: string

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

    @Column({
    	type: "boolean",
    	default: false
    })
    	isDeleted: boolean

      @ManyToOne(() => UserEntity, (user) => user.postLikes)
      @JoinColumn({ name: "userId" })
      	user: UserEntity

  @ManyToOne(() => PostEntity, (post) => post.postLikes)
  @JoinColumn({ name: "postId" })
  	post: PostEntity
}