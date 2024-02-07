import { Column, Entity, ManyToMany } from "typeorm"
import CourseEntity from "./course.entity"

@Entity()
export class TopicEntity {
    @Column()
    	topicName: string

	// @ManyToMany(() => CourseEntity, course => course.topics)
	// 	courses: CourseEntity[]
}