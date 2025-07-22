import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ComplainsEntity } from '../complains/complains.entity';
import { ManagerEntity } from '../manager/manager.entity';

@Entity('ComplainsLog')
export class ComplainsLogEntity {
  @PrimaryGeneratedColumn() id: string;
  @Column() complainsId: string;
  @JoinColumn({ name: 'complainsId' })
  @OneToOne(() => ComplainsEntity, (e) => e.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  complain: ComplainsEntity;

  @Column() managerId: string;
  @JoinColumn({ name: 'managerId' })
  @ManyToOne(() => ManagerEntity, { onDelete: 'CASCADE' })
  manager: ManagerEntity;

  @Column() note: string;
}
