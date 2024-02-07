import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm"
import LectureEntity from "./lecture.entity"

@Entity("resource")
export default class ResourceEntity {
  @PrimaryGeneratedColumn("uuid")
  	resourceId: string

  @Column({ type: "varchar", length: 200 })
  	resourceLink: string

  @Column({ name: "lectureId", type: "uuid", length: 36 })
  	lectureId: string

  @ManyToOne(() => LectureEntity, (lecture) => lecture.resource)
  @JoinColumn({ name: "lectureId" })
  	lecture: LectureEntity
}
