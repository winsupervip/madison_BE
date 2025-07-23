import { Crud } from '@dataui/crud';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

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
  @Post('guest')
  createGuest(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.service.createGuest(authCredentialsDto);
  }
}
