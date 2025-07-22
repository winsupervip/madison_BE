import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RouteMetadata } from 'nestjs-gis';
import { ManagerNotificationEntity } from './managerNotification.entity';
import { ManagerNotificationService } from './managerNotification.service';

@RouteMetadata()
@Crud({
  model: { type: ManagerNotificationEntity },
  params: {
    id: {
      primary: true,
      type: 'string',
      field: 'id',
    },
  },
})
@Controller('rest/ManagerNotification')
export class ManagerNotificationController {
  constructor(private service: ManagerNotificationService) {}
}
