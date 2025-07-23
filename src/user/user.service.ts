import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@dataui/crud';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { DeepPartial } from 'typeorm';
import { hash } from '../util/auth.util';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }

  createOne(
    req: CrudRequest,
    dto: DeepPartial<UserEntity>,
  ): Promise<UserEntity> {
    const entity = this.prepareEntityBeforeSave(dto, req.parsed);
    entity.password = hash(entity.password);
    return this.repo.save(entity);
  }
  createGuest(dto: DeepPartial<UserEntity>): Promise<UserEntity> {
    const entity = { ...dto } as UserEntity;
    entity.password = hash(entity.password);
    return this.repo.save(entity);
  }

  getOne(req: CrudRequest): Promise<UserEntity> {
    return this.getOneOrFail(req);
  }
}
