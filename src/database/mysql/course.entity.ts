import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"

import PostEntity from "./post.entity"
import EnrolledEntity from "./enrolled-info.entity"
import SectionEntity from "./section.entity"
import UserEntity from "./user.entity"
import { VerifiedStatus } from "@common"

interface CourseIncludes {
  time: number;
}

@Entity("course")
export default class CourseEntity {
  @PrimaryGeneratedColumn("uuid")
  	courseId: string

  @Column({
  	type: "varchar",
  	length: 1000,
  	default: null,
  })
  	title: string

  @Column({
  	type: "uuid",
  	length: 36,
  	default: null,
  })
  	thumbnailId: string

  @Column({ type: "varchar", length: 1000 })
  	description: string

  @Column({ type: "float", default: 0 })
  	price: number

  @Column({ type: "enum", enum: VerifiedStatus, default: null })
  	verifiedStatus: VerifiedStatus

  @Column({ default: true })
  	isDraft: boolean

  @Column({ type: "uuid", length: 36 })
  	creatorId: string

  @Column({ default: false })
  	isDeleted: boolean

  @Column({ type: "uuid", length: 36 })
  	previewVideoId: string

  @Column({ type: "varchar", length: 255, default: null })
  	targets: string

  @Column({ type: "json", default: null })
  	includes: CourseIncludes

  // --- relations ---
  @OneToMany(() => PostEntity, (post) => post.course)
  	posts: PostEntity[]

  @OneToMany(() => EnrolledEntity, (enrolled) => enrolled.course)
  	enrolledInfos: EnrolledEntity[]

  //section
  @OneToMany(() => SectionEntity, (section) => section.course, {
  	onDelete: "CASCADE",
  })
  	sections: SectionEntity[]

  @ManyToOne(() => UserEntity, (user) => user.courses)
  @JoinColumn({ name: "creatorId" })
  	creator: UserEntity
}
