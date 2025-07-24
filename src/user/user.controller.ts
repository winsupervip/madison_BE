import { Crud, ParsedRequest } from '@dataui/crud';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'nestjs-gis';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Crud({
  model: { type: UserEntity },
  query: { exclude: ['password', 'username'] },
  params: {
    id: {
      primary: true,
      type: 'number',
      field: 'id',
    },
  },
  routes: { exclude: ['createManyBase', 'createOneBase', 'deleteOneBase'] },
})
@Controller('rest/user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.service.login(username, password);
  }
  @UseGuards(JwtAuthGuard)
  @Get('refreshtoken')
  refreshToken(@ParsedRequest() req) {
    return this.service.refreshToken(req.user.userId);
  }

  @Post('createUser')
  createUser(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.service.createUser(authCredentialsDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('isAccess')
  isAccess(@Req() req) {
    console.log(req);

    const user = req.user;

    if (user.role !== 'user') {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    return {
      message: 'Truy cập hợp lệ',
      user,
    };
  }
}
