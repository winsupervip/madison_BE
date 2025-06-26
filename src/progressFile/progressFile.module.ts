import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressFileController } from './progressFile.controller';
import { ProgressFileEntity } from './progressFile.entity';
import { ProgressFileService } from './progressFile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgressFileEntity])],
  providers: [ProgressFileService],
  controllers: [ProgressFileController],
})
export class ProgressFileModule {}
