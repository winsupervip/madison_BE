import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProgressFileService } from './progressFile.service';

@Controller('progressFile')
export class ProgressFileController {
  constructor(private service: ProgressFileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    if (!file.mimetype.startsWith('image/')) {
      throw new Error('Uploaded file is not an image');
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      throw new Error('File size exceeds the limit of 5MB');
    }
    // Gọi service để xử lý upload
    return this.service.uploadImage(file);
  }
}
