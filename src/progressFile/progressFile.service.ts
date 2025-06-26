import { Injectable } from '@nestjs/common';

@Injectable()
export class ProgressFileService {
  getHello(): string {
    return 'Hello World!';
  }
}
