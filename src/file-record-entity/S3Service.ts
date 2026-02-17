import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class S3Service {
    private readonly s3client: S3Client;
    private readonly bucketName: string;
    constructor(private readonly configService: ConfigService) {
        this.s3client = new S3Client({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
            }
        });
        this.bucketName = this.configService.get('AWS_BUCKET_NAME');
    }

    async generatePresignedUrl(filename: string, contentType: string, fileSize: number): Promise<{ uploadUrl: string, key: string }> {
        const key = `file-storage0/${v4()}/${filename}`;
        const uploadUrl = await getSignedUrl(this.s3client, new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            ContentType: contentType,
            ContentLength: fileSize
        }), {
            expiresIn: 300
        });
        return { uploadUrl, key };
    }
}