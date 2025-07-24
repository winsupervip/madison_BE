import { CrudRequest } from '@dataui/crud';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { DeepPartial } from 'typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { hash } from '../util/auth.util';
import { UserEntity } from './user.entity';
@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repo,
    private jwtService: JwtService,
  ) {
    super(repo);
  }

  createOne(
    req: CrudRequest,
    dto: DeepPartial<UserEntity>,
  ): Promise<UserEntity> {
    const entity = this.prepareEntityBeforeSave(dto, req.parsed);
    entity.password = hash(entity.password);
    return this.repo.save(entity);
  }

  getOne(req: CrudRequest): Promise<UserEntity> {
    return this.getOneOrFail(req);
  }
  async login(username: string, password: string) {
    const user = await this.repo.findOne({
      where: {
        username,
      },
    });
    if (user && compareSync(password, user.password)) {
      const result = {
        id: '',
        name: '',
        phone: '',
        email: '',
        role: 'user',
      };

      result.id = user.id;
      result.name = user.name;
      result.phone = user.phone;
      result.email = user.email;

      return {
        ...result,
        expired: Math.round(
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime() / 1000,
        ),
        accessToken: this.jwtService.sign(result),
      };
    }
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Sai tài khoản hoặc mật khẩu',
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
  async refreshToken(userId: string) {
    const payload = await this.repo.findOne({
      where: {
        id: userId,
      },
    });
    if (!payload) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Người dùng không tồn tại',
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      accessToken: this.jwtService.sign(
        { userId: payload.id },
        {
          expiresIn: '15m',
        },
      ),
      expired: Math.round(
        new Date(Date.now() + 15 * 60 * 1000).getTime() / 1000,
      ),
    };
  }

  async checkUser(authCredentialsDto: AuthCredentialsDto) {
    // kiểm tra trùng user
    const user = authCredentialsDto;
    const count = await this.repo.count({
      where: {
        username: user.username,
      },
    });
    if (count > 0) {
      throw new BadRequestException({
        message: [`Tài khoản ${user.username} đã tồn tại trong hệ thống`],
      });
    }
    return user;
  }

  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const user = await this.checkUser(authCredentialsDto);

    const entity = this.repo.create(user);
    entity.password = hash(user.password);

    const result = await this.repo.save(entity);
    return {
      message: 'Tạo tài khoản thành công',
      data: {
        userId: result.id,
      },
    };
  }
}
