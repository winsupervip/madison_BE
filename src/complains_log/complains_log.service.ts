import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ComplainsLogEntity } from './complains_log.entity';

@Injectable()
export class ComplainsLogService extends TypeOrmCrudService<ComplainsLogEntity> {
  constructor(@InjectRepository(ComplainsLogEntity) repo) {
    super(repo);
  }
  recoverOne(req: CrudRequest): Promise<void | ComplainsLogEntity> {
    return this.repo.recover(req.parsed.paramsFilter[0].value);
  }
}
