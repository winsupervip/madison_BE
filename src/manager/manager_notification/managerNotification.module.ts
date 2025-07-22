import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerNotificationController } from './managerNotification.controller';
import { ManagerNotificationEntity } from './managerNotification.entity';
import { ManagerNotificationService } from './managerNotification.service';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerNotificationEntity])],
  providers: [ManagerNotificationService],
  controllers: [ManagerNotificationController],
})
export class ManagerNotificationModule {}
