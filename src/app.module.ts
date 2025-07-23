import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComplainsModule } from './complains/complains.module';
import { ComplainsLogModule } from './complains_log/complains_log.module';
import { defaultConfig } from './configs/datasource/default.datasource';
import { ManagerModule } from './manager/manager.module';
import { jwtConstants } from './strategy/constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ManagerModule,
    ComplainsModule,
    ComplainsLogModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5 days' },
    }),
    TypeOrmModule.forRoot(defaultConfig),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
