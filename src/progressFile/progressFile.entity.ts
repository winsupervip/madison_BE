import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ProgressFile')
export class ProgressFileEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() originalFileName: string;

  @Column() filePath: string;

  @Column() fileType: string;

  @Column() fileSize: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  uploadDate: Date;
}
