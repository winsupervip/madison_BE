import { Crud } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { RouteMetadata } from 'nestjs-gis';
import { ComplainsEntity } from './complains.entity';
import { ComplainsService } from './complains.service';

@RouteMetadata()
@Crud({
  model: { type: ComplainsEntity },
  params: {
    id: {
      primary: true,
      type: 'number',
      field: 'id',
    },
  },
  query: {
    join: {
      log: {},
      user: {},
    },
    sort: [
      {
        field: 'id',
        order: 'ASC',
      },
    ],
  },
})
@Controller('rest/complains')
export class ComplainsController {
  constructor(private service: ComplainsService) {}
}
