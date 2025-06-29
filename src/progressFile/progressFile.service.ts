import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
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

  async extractFramesFromVideo(
    video: Express.Multer.File,
    imageId: string,
    duration: number,
  ) {
    const uploadDir = join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const videoPath = join(uploadDir, video.originalname);
    fs.writeFileSync(videoPath, video.buffer);

    const framesDir = join(uploadDir, `${imageId}_frames`);
    if (!fs.existsSync(framesDir)) {
      fs.mkdirSync(framesDir, { recursive: true });
    }

    // Sử dụng ffmpeg để tách frame
    // Lưu frame dưới dạng: {imageId}_frame_%03d.jpg
    await new Promise<void>((resolve, reject) => {
      ffmpeg(videoPath)
        .output(join(framesDir, `${imageId}_frame_%03d.jpg`))
        .outputOptions([
          `-vf fps=1/${duration}`, // Tách 1 frame mỗi {duration} giây
        ])
        .on('end', () => resolve())
        .on('error', (err) =>
          reject(
            new Error(
              typeof err === 'string' ? err : err?.message || 'Unknown error',
            ),
          ),
        )
        .run();
    });

    // Lấy danh sách frame đã tách
    const frames = fs
      .readdirSync(framesDir)
      .filter((f) => f.endsWith('.jpg'))
      .map((f, idx) => ({
        id: `${imageId}_frame_${idx}`,
        path: `/uploads/${imageId}_frames/${f}`,
        match: false, // initialize match property
      }));
    // Kiểm tra imageId, lấy ảnh từ imageId
    const imagePath = join(uploadDir, imageId);
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image with id ${imageId} does not exist`);
    }
    const imageBuffer = fs.readFileSync(imagePath);

    // Giả lập gọi OpenAI API để kiểm tra ảnh có trong từng frame không

    for (const frame of frames) {
      // Đọc buffer của frame
      const framePath = join(
        uploadDir,
        `${imageId}_frames`,
        frame.path.split('/').pop()!,
      );
      const frameBuffer = fs.readFileSync(framePath);

      // Giả lập so sánh ảnh (ở đây chỉ so sánh kích thước, thực tế sẽ gọi API)
      if (imageBuffer.length === frameBuffer.length) {
        frame.match = true; // Ảnh giống nhau (giả lập)
      } else {
        frame.match = false;
      }
      // Nếu gọi OpenAI API, bạn sẽ gửi imageBuffer và frameBuffer lên để kiểm tra
      // và gán kết quả vào frame.match
    }
    return frames;
  }
}
