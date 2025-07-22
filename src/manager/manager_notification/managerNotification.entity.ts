import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { ManagerEntity } from '../manager.entity';

@Entity('ManagerNotification')
export class ManagerNotificationEntity {
  @PrimaryGeneratedColumn() id: string;

  @Column() managerId: string;
  @JoinColumn({ name: 'managerId' })
  @ManyToOne(() => ManagerEntity, { onDelete: 'CASCADE' })
  manager: ManagerEntity;

  @Column({ type: 'text' }) title: string;
  @Column({ type: 'text' }) description: string;

  @CreateDateColumn() createDate: Date;
  @UpdateDateColumn() updateDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  attachment_url: string;

  @Column() userId: string;
  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;
}
