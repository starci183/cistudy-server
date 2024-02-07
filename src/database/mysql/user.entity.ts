import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import SessionEntity from "./session.entity"
import PostCommentEntity from "./post-comment.entity"
import PostLikeEntity from "./post-like.entity"
import EnrolledEntity from "./enrolled-info.entity"
import { UserKind, UserRole } from "@common"
import PostEntity from "./post.entity"
import CourseEntity from "./course.entity"

@Entity("user")
export default class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  	userId: string

  @Column({ type: "varchar", length: 50, default: null })
  	email: string

  @Column({ type: "varchar", length: 64, default: null })
  	password: string

  @Column({ type: "varchar", length: 200, default: null })
  	avatarUrl: string

  @Column({ type: "varchar", length: 12, default: null })
  	phoneNumber: string

  @Column({
  	type: "decimal",
  	precision: 10,
  	scale: 5,
  	default: 0,
  })
  	balance: number

  @Column({
  	type: "enum",
  	enum: UserRole,
  	default: UserRole.User,
  })
  	role: UserRole

  @Column({
  	type: "uuid",
  	default: null,
  })
  	walletId: string

  @Column({ type: "varchar", length: 50, default: null })
  	firstName: string

  @Column({ type: "varchar", length: 50, default: null })
  	lastName: string

  @Column({ type: "date", default: null })
  	birthdate: Date

  @Column({ type: "boolean", default: false })
  	verified: boolean

  @Column({ type: "enum", enum: UserKind, default: UserKind.Local })
  	kind: UserKind

  @Column({ type: "varchar", length: 128, default: null })
  	externalId: string

  @OneToMany(() => SessionEntity, (session) => session.user)
  	sessions: SessionEntity[]

  @OneToMany(() => PostCommentEntity, (postComment) => postComment.user)
  	postComments: PostCommentEntity[]

  @OneToMany(() => PostLikeEntity, (postLike) => postLike.user)
  	postLikes: PostLikeEntity[]

  @OneToMany(() => EnrolledEntity, (enrolled) => enrolled.user)
  	enrolledInfos: EnrolledEntity[]

  @OneToMany(() => PostEntity, (post) => post.creator)
  	posts: PostEntity[]

  @OneToMany(() => CourseEntity, (course) => course.creator)
  	courses: CourseEntity[]
}
