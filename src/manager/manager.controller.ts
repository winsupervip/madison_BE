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
import { JwtAuthGuard, RouteMetadata } from 'nestjs-gis';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { ManagerEntity } from './manager.entity';
import { ManagerService } from './manager.service';

@RouteMetadata()
@Crud({
  model: { type: ManagerEntity },
  query: { exclude: ['password', 'username'] },
  params: {
    id: {
      primary: true,
      type: 'number',
      field: 'id',
    },
  },
})
@Controller('rest/manager')
export class ManagerController {
  constructor(private service: ManagerService) {}

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

  @Post('createManager')
  createManager(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.service.createManager(authCredentialsDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('isAccess')
  isAccess(@Req() req) {
    const user = req.user;

    if (user.role !== 'manager') {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    return {
      message: 'Truy cập hợp lệ',
      user,
    };
  }
}
