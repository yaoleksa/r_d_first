import { Module } from "@nestjs/common";
import { FileRecordController } from "./FileRecordController";
import { FileRecordService } from "./FileRecordService";
import { S3Service } from "./S3Service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { S3Client } from "@aws-sdk/client-s3";

@Module({
    imports: [ConfigModule.forRoot(), AuthModule],
    controllers: [FileRecordController],
    providers: [FileRecordService, S3Service, S3Client]
})
export class FileRecordModule {}