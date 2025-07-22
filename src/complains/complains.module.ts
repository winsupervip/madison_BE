import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplainsController } from './complains.controller';
import { ComplainsEntity } from './complains.entity';
import { ComplainsService } from './complains.service';
import { UserEntity } from 'nestjs-gis';

@Module({
  imports: [TypeOrmModule.forFeature([ComplainsEntity, UserEntity])],
  providers: [ComplainsService],
  controllers: [ComplainsController],
})
export class ComplainsModule {}
