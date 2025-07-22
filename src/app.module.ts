import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComplainsModule } from './complains/complains.module';
import { ComplainsLogModule } from './complains_log/complains_log.module';
import { defaultConfig } from './configs/datasource/default.datasource';
import { ManagerModule } from './manager/manager.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ManagerModule,
    ComplainsModule,
    ComplainsLogModule,
    TypeOrmModule.forRoot(defaultConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
