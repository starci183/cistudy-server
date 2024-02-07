import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Field, Float, ID, ObjectType } from "@nestjs/graphql"
import { VerifiedStatus } from "@common"
import PostEntity from "./post.entity"
import EnrolledEntity from "./enrolled-info.entity"
import SectionEntity from "./section.entity"
import UserEntity from "./user.entity"

interface CourseIncludes {
  time: number;
}

@ObjectType()
@Entity("course")
export default class Course {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  	courseId: string

  @Field(() => String)
  @Column({
  	type: "varchar",
  	length: 1000,
  	default: null,
  })
  	title: string

  @Field(() => String, { nullable: true })
  @Column({
  	type: "uuid",
  	length: 36,
  	default: null,
  })
  	thumbnailId: string

  @Field(() => String)
  @Column({ type: "varchar", length: 1000 })
  	description: string

  @Field(() => Float, { defaultValue: 0 })
  @Column({ type: "float", default: 0 })
  	price: number

  @Field(() => VerifiedStatus, { nullable: true })
  @Column({ type: "enum", enum: VerifiedStatus, default: null })
  	verifiedStatus: VerifiedStatus

  @Field(() => Boolean, { defaultValue: true })
  @Column({ default: true })
  	isDraft: boolean

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.courses)
  @JoinColumn({ name: "creatorId" })
  	creator: UserEntity

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  	isDeleted: boolean

  @Field(() => String, { nullable: true })
  @Column({ type: "uuid", length: 36 })
  	previewVideoId: string

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", length: 255, default: null })
  	targets: string

  @Field(() => String, { nullable: true })
  @Column({ type: "json", default: null })
  	includes: CourseIncludes

  @OneToMany(() => PostEntity, (post) => post.course)
  	posts: PostEntity[]

  @OneToMany(() => EnrolledEntity, (enrolled) => enrolled.course)
  	enrolledInfos: EnrolledEntity[]

  @OneToMany(() => SectionEntity, (section) => section.course, {
  	onDelete: "CASCADE",
  })
  	sections: SectionEntity[]
}