import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RouteMetadata } from 'nestjs-gis';
import { ManagerEntity } from './manager.entity';
import { ManagerService } from './manager.service';

@RouteMetadata()
@Crud({
  model: { type: ManagerEntity },
  params: {
    id: {
      primary: true,
      type: 'string',
      field: 'id',
    },
  },
})
@Controller('rest/manager')
export class ManagerController {
  constructor(private service: ManagerService) {}
}
