import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RouteMetadata } from 'nestjs-gis';
import { ComplainsEntity } from './complains.entity';
import { ComplainsService } from './complains.service';

@RouteMetadata()
@Crud({
  model: { type: ComplainsEntity },
  params: {
    id: {
      primary: true,
      type: 'string',
      field: 'id',
    },
  },
})
@Controller('rest/complains')
export class ComplainsController {
  constructor(private service: ComplainsService) {}
}
