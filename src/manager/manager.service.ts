import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@dataui/crud';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { DeepPartial } from 'typeorm';
import { hash } from '../util/auth.util';
import { ManagerEntity } from './manager.entity';

@Injectable()
export class ManagerService extends TypeOrmCrudService<ManagerEntity> {
  constructor(@InjectRepository(ManagerEntity) repo) {
    super(repo);
  }

  createOne(
    req: CrudRequest,
    dto: DeepPartial<ManagerEntity>,
  ): Promise<ManagerEntity> {
    const entity = this.prepareEntityBeforeSave(dto, req.parsed);
    entity.password = hash(entity.password);
    return this.repo.save(entity);
  }
}
