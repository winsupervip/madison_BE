import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ManagerEntity } from './manager.entity';

@Injectable()
export class ManagerService extends TypeOrmCrudService<ManagerEntity> {
  constructor(@InjectRepository(ManagerEntity) repo) {
    super(repo);
  }
  recoverOne(req: CrudRequest): Promise<void | ManagerEntity> {
    return this.repo.recover(req.parsed.paramsFilter[0].value);
  }
}
