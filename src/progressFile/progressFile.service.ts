import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as ffmpegPath from 'ffmpeg-static';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class ProgressFileService {
  uploadImage(file: Express.Multer.File) {
    const uploadDir = join(__dirname, '../../uploads/images');
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
    const videoDir = join(__dirname, '../../uploads/videos');
    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true });
    }
    const videoPath = join(videoDir, video.originalname);
    fs.writeFileSync(videoPath, video.buffer);

    const framesDir = join(
      __dirname,
      `../../uploads/frames`,
      video.originalname,
    );
    if (!fs.existsSync(framesDir)) {
      fs.mkdirSync(framesDir, { recursive: true });
    }

    // Tách frame từ video và lưu vào thư mục uploads/frames
    await this.extractFrames(
      videoPath,
      framesDir,

      duration,
    );
    const frames = this.getDurationFromImageId(
      imageId,
      framesDir,
      video.originalname,
    );
    return frames;
  }

  private extractFrames(
    videoPath: string,
    framesPath: string,
    duration: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Sử dụng ffmpeg để tách frame mỗi 'duration' giây
      if (!ffmpegPath) {
        return reject(new Error('ffmpeg-static binary not found'));
      }
      const outputPattern = join(framesPath, 'clip_%03d.MOV');
      const ffmpeg = spawn(ffmpegPath as unknown as string, [
        '-i',
        videoPath,
        '-c',
        'copy',
        '-map',
        '0',
        '-segment_time',
        duration.toString(),
        '-f',
        'segment',
        outputPattern,
      ]);
      ffmpeg.stderr.on('data', (data) => {
        console.error(`ffmpeg stderr: ${data}`);
      });

      ffmpeg.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`ffmpeg exited with code ${code}`));
        }
      });
    });
  }
  getImageBuffer(imageId): Buffer {
    // Kiểm tra imageId, lấy ảnh từ imageId
    const imagePath = join(__dirname, '../../uploads/images', imageId);
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image with id ${imageId} does not exist`);
    }
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer;
  }

  getDurationFromImageId(
    imageId: string,
    framePath: string,
    videoName: string,
  ) {
    // Lấy danh sách frame đã tách
    const frames = fs
      .readdirSync(framePath)
      .filter((f) => f.startsWith('clip_') && f.endsWith('.MOV'))
      .map((f, idx) => ({
        id: `${videoName}_frame_${idx}`,
        path: `/uploads/frames/${videoName}/${f}`,
        match: false, // initialize match property
        duration: null as number | null, // initialize duration property
      }));

    const imageBuffer = this.getImageBuffer(imageId);

    for (const frame of frames) {
      // Giả lập gọi OpenAI API: kiểm tra xem image có trong frame không

      // Giả lập: nếu imageBuffer.length % (idx+1) === 0 thì coi như match
      const frameIndex = parseInt(
        frame.path.match(/_(\d+)\.MOV$/)?.[1] || '0',
        10,
      );
      if (imageBuffer.length % (frameIndex + 1) === 0) {
        frame.match = true;
        frame.duration = frameIndex; // duration tính bằng giây (giả lập)
      } else {
        frame.match = false;
        frame.duration = 0;
      }
    }
    return frames;
  }
}
