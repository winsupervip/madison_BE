import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ComplainsLogEntity } from './complains_log.entity';

@Injectable()
export class ComplainsLogService extends TypeOrmCrudService<ComplainsLogEntity> {
  constructor(@InjectRepository(ComplainsLogEntity) repo) {
    super(repo);
  }
}
