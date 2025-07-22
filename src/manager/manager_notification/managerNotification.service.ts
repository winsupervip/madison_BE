import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ManagerNotificationEntity } from './managerNotification.entity';

@Injectable()
export class ManagerNotificationService extends TypeOrmCrudService<ManagerNotificationEntity> {
  constructor(@InjectRepository(ManagerNotificationEntity) repo) {
    super(repo);
  }
  recoverOne(req: CrudRequest): Promise<void | ManagerNotificationEntity> {
    return this.repo.recover(req.parsed.paramsFilter[0].value);
  }
}
