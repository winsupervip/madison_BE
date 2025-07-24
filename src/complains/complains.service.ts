import { CrudRequest } from '@dataui/crud';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { ComplainsEntity } from './complains.entity';

@Injectable()
export class ComplainsService extends TypeOrmCrudService<ComplainsEntity> {
  constructor(@InjectRepository(ComplainsEntity) repo) {
    super(repo);
  }
  updateOne(
    req: CrudRequest,
    dto: DeepPartial<ComplainsEntity>,
  ): Promise<ComplainsEntity> {
    const entity = this.prepareEntityBeforeSave(dto, req.parsed);
    console.log('Updating entity:', entity);

    return this.repo.save(entity);
  }
}
