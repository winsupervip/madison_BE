import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ManagerNotificationEntity } from './managerNotification.entity';

@Injectable()
export class ManagerNotificationService extends TypeOrmCrudService<ManagerNotificationEntity> {
  constructor(@InjectRepository(ManagerNotificationEntity) repo) {
    super(repo);
  }
}
