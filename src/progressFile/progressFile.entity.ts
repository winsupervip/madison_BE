import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ProgressFile')
export class ProgressFileEntity {
  @PrimaryGeneratedColumn() id: string;
}
