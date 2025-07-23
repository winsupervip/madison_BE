import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Crud, CrudRequest, ParsedRequest } from '@dataui/crud';
import { RouteMetadata } from 'nestjs-gis';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
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
  @Post()
  createGuest(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.service.createOne(req, authCredentialsDto);
  }
}
