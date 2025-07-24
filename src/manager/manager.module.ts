import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from '../strategy/constants';
import { ManagerController } from './manager.controller';
import { ManagerEntity } from './manager.entity';
import { ManagerService } from './manager.service';
import { ManagerNotificationModule } from './manager_notification/managerNotification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManagerEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5 days' },
    }),
    ManagerNotificationModule,
  ],
  providers: [ManagerService],
  controllers: [ManagerController],
})
export class ManagerModule {}
