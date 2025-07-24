import { Crud } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { RouteMetadata } from 'nestjs-gis';
import { ComplainsLogEntity } from './complains_log.entity';
import { ComplainsLogService } from './complains_log.service';

@RouteMetadata()
@Crud({
  model: { type: ComplainsLogEntity },
  params: {
    id: {
      primary: true,
      type: 'number',
      field: 'id',
    },
  },
  query: {
    join: {
      complain: {},
      manager: {},
    },
    sort: [
      {
        field: 'id',
        order: 'ASC',
      },
    ],
  },
})
@Controller('rest/complainsLog')
export class ComplainsLogController {
  constructor(private service: ComplainsLogService) {}
}
