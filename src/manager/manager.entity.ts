import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Manager')
export class ManagerEntity {
  @PrimaryGeneratedColumn() id: string;
  @Column() name: string;
  @Column() phone: string;
  @Column({ nullable: true }) email: string;
  @Column() password: string;
  @Column() username: string;
}
