import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerController } from './manager.controller';
import { ManagerEntity } from './manager.entity';
import { ManagerService } from './manager.service';
import { ManagerNotificationModule } from './manager_notification/managerNotification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManagerEntity]),
    ManagerNotificationModule,
  ],
  providers: [ManagerService],
  controllers: [ManagerController],
})
export class ManagerModule {}
