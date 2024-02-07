import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"

import UserEntity from "./user.entity"

@Entity("session")
export default class SessionEntity {
  @PrimaryGeneratedColumn("uuid")
  	sessionId: string

  @Column({ type: "uuid", length:"36" })
  	userId: string

  @Column({
  	type: "timestamp",
  	default: () => "CURRENT_TIMESTAMP",
  	onUpdate: "CURRENT_TIMESTAMP",
  })
  	createdAt: Date

  @Column({ type: "boolean", default: false })
  	isDisabled: boolean

  @Column({
  	type: "uuid", length:"36"
  })
  	clientId: string
  
  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @JoinColumn({ name: "userId" })
  	user: UserEntity
}
