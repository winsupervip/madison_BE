import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

export enum ComplainsStatusEnum {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Resolved = 'Resolved',
}

@Entity('Complains')
export class ComplainsEntity {
  @PrimaryGeneratedColumn() id: string;
  @Column() userId: string;
  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column({ type: 'text' }) title: string;
  @Column({ type: 'text' }) description: string;
  @Column({ type: 'varchar', default: ComplainsStatusEnum.Pending })
  status: ComplainsStatusEnum;
  @CreateDateColumn() createDate: Date;
  @UpdateDateColumn() updateDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  attachment_url: string;
}
