import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { defaultConfig } from './configs/datasource/default.datasource';
import { ProgressFileModule } from './progressFile/progressFile.module';

@Module({
  imports: [TypeOrmModule.forRoot(defaultConfig), ProgressFileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
