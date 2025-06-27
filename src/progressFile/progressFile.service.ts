import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
@Injectable()
export class ProgressFileService {
  uploadImage(file: Express.Multer.File) {
    const uploadDir = join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
    // Trả về đường dẫn file đã lưu
    return `/uploads/${file.originalname}`;
  }
}
