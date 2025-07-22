import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplainsEntity } from '../complains/complains.entity';
import { ManagerEntity } from '../manager/manager.entity';
import { ComplainsLogController } from './complains_log.controller';
import { ComplainsLogEntity } from './complains_log.entity';
import { ComplainsLogService } from './complains_log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ComplainsLogEntity,
      ComplainsEntity,
      ManagerEntity,
    ]),
  ],
  providers: [ComplainsLogService],
  controllers: [ComplainsLogController],
})
export class ComplainsLogModule {}
