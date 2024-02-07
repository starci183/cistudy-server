import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import SectionEntity from "./section.entity"
import ResourceEntity from "./resource.entity"

@Entity("lecture")
export default class LectureEntity {
    @PrimaryGeneratedColumn("uuid")
    	lectureId: string

    @Column({ type: "varchar", length: 150 })
    	title: string

    @Column({ type: "uuid", length: 36 })
    	videoId: string

    @Column({ name: "sectionId", type: "uuid", length: 36 })
    	sectionId: string

    @Column({
    	type: "timestamp",
    	default: () => "CURRENT_TIMESTAMP",
    	onUpdate: "CURRENT_TIMESTAMP",
    })
    	createdAt: Date

    @ManyToOne(() => SectionEntity, (section) => section.lecture)
    @JoinColumn({ name: "sectionId" })
    	section: SectionEntity

    @OneToMany(() => ResourceEntity, (resource) => resource.lecture)
    	resource: ResourceEntity
}
