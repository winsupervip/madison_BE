import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ComplainsEntity } from './complains.entity';

@Injectable()
export class ComplainsService extends TypeOrmCrudService<ComplainsEntity> {
  constructor(@InjectRepository(ComplainsEntity) repo) {
    super(repo);
  }
}
