import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: 'ap-northeast-2',
    });
  }

  // S3에 파일 업로드
  async uploadFileS3(id: number, file: Express.Multer.File) {
    const params = {
      Bucket: 'kkobak-static',
      Key: `${id}/${file.originalname}`,
      Body: file.buffer,
    };

    const result = await this.s3.upload(params).promise();

    // s3 파일 접근 url
    return result.Location;
  }
}
