import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ComplainsEntity } from './complains.entity';

@Injectable()
export class ComplainsService extends TypeOrmCrudService<ComplainsEntity> {
  constructor(@InjectRepository(ComplainsEntity) repo) {
    super(repo);
  }
  recoverOne(req: CrudRequest): Promise<void | ComplainsEntity> {
    return this.repo.recover(req.parsed.paramsFilter[0].value);
  }
}
