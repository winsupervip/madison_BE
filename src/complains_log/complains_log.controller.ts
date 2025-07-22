import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RouteMetadata } from 'nestjs-gis';
import { ComplainsLogEntity } from './complains_log.entity';
import { ComplainsLogService } from './complains_log.service';

@RouteMetadata()
@Crud({
  model: { type: ComplainsLogEntity },
  params: {
    id: {
      primary: true,
      type: 'string',
      field: 'id',
    },
  },
})
@Controller('rest/complainsLog')
export class ComplainsLogController {
  constructor(private service: ComplainsLogService) {}
}
