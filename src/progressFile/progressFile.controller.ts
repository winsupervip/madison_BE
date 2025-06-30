import {
  Body,
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

  @Post('uploadImage')
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

  @Post('detectedBrand/mock-openai')
  @UseInterceptors(FileInterceptor('video'))
  async mockOpenAIApi(
    @UploadedFile() video: Express.Multer.File,
    @Body('imageId') imageId: string,
  ) {
    if (!video) {
      throw new Error('No video uploaded');
    }
    if (!imageId) {
      throw new Error('No imageId provided');
    }
    if (!video.mimetype.startsWith('video/')) {
      throw new Error('Uploaded file is not a video');
    }
    // Gọi service để tách video thành các frame dài 10s bằng ffmpeg
    return this.service.extractFramesFromVideo(video, imageId, 10);
  }
}
