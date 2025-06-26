import { Controller, Get } from '@nestjs/common';
import { ProgressFileService } from './progressFile.service';

@Controller('rest/progressFile')
export class ProgressFileController {
  constructor(private service: ProgressFileService) {}
  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
