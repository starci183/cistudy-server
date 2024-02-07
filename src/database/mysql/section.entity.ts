import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import LectureEntity from "./lecture.entity"
import CourseEntity from "./course.entity"

@Entity("section")
export default class SectionEntity {
    @PrimaryGeneratedColumn("uuid")
    	sectionId: string

    @Column({ type: "varchar", length: 200 })
    	title: string

    @Column({ name: "courseId", type: "uuid", length: 36 })
    	courseId: string

    @Column({
    	type: "timestamp",
    	default: () => "CURRENT_TIMESTAMP",
    	onUpdate: "CURRENT_TIMESTAMP",
    })
    	createdAt: Date

    @ManyToOne(() => CourseEntity, (course) => course.sections)
    @JoinColumn({ name: "courseId" })
    	course: CourseEntity

    @OneToMany(() => LectureEntity, (video) => video.section)
    	lecture: LectureEntity[]
}
