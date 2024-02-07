import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm"
import CourseEntity from "./course.entity"
import PostCommentEntity from "./post-comment.entity"
import PostContentEntity from "./post-content.entity"
import PostLikeEntity from "./post-like.entity"
import UserEntity from "./user.entity"
import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
@Entity("post")
export default class PostEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    	postId: string

    @Field(() => String)
    @Column({ type: "varchar", length: 500 })
    	title: string

    @Field(() => String)
    @Column({ type: "uuid", length: 36 })
    	creatorId: string

    @Field(() => String)
    @Column({ type: "uuid", length: 36 })
    	courseId: string

    @Field(() => String)
    @CreateDateColumn()
    	createdAt: Date

    @UpdateDateColumn({ nullable: true })
    	updatedAt: Date

    @ManyToOne(() => CourseEntity, (course) => course.posts)
    @JoinColumn({ name: "courseId" })
    	course: CourseEntity

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: "creatorId" })
    	creator: UserEntity

    @OneToMany(() => PostContentEntity, (postContent) => postContent.post, {
    	cascade: ["remove", "insert", "update"],
    })
    	postContents: Partial<PostContentEntity>[]

    @OneToMany(() => PostCommentEntity, (postComment) => postComment.post)
    	postComments: PostCommentEntity[]

    @OneToMany(() => PostLikeEntity, (postLike) => postLike.post)
    	postLikes: PostLikeEntity[]
}
