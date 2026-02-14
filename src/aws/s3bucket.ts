import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

@Injectable()
export class S3Service {
    private readonly s3client: S3Client;
    private readonly bucketName: string;
    constructor(configService: ConfigService) {
        this.s3client = new S3Client({
            region: configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: 'AWS_SECRET_ACCESS_KEY'
            }
        });
        this.bucketName = configService.get('AWS_BUCKET_NAME');
    }

    async generatePresignedUrl() {}
}