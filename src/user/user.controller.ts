import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RouteMetadata } from 'nestjs-gis';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@RouteMetadata()
@Crud({
  model: { type: UserEntity },
  params: {
    id: {
      primary: true,
      type: 'string',
      field: 'id',
    },
  },
})
@Controller('rest/user')
export class UserController {
  constructor(private service: UserService) {}
}
