import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import UserEntity from "./user.entity"
import CourseEntity from "./course.entity"

@Entity("enrolled_info")
export default class EnrolledInfoEntity {
  @PrimaryGeneratedColumn("uuid")
  	enrolledId: string

  @Column({ type: "uuid", length: 36 })
  	userId: string

  @Column({ type: "uuid", length: 36 })
  	courseId: string

  @Column({
  	type: "timestamp",
  	default: () => "CURRENT_TIMESTAMP",
  	onUpdate: "CURRENT_TIMESTAMP",
  })
  	enrolledAt: Date

  @ManyToOne(() => CourseEntity, (course) => course.enrolledInfos)
  @JoinColumn({ name: "courseId" })
  	course: CourseEntity

  @ManyToOne(() => UserEntity, (user) => user.enrolledInfos)
  @JoinColumn({ name: "userId" })
  	user: UserEntity
}
