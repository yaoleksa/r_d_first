import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

@Injectable()
export class S3Service {
    private readonly s3client: S3Client;
    private readonly bucketName: string;
    constructor(private configService: ConfigService) {
        console.log(this.configService);
        this.s3client = new S3Client({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: 'AWS_SECRET_ACCESS_KEY'
            }
        });
    }
}