import { Module } from "@nestjs/common";
import { FileRecordController } from "./FileRecordController";
import { FileRecordService } from "./FileRecordService";
import { S3Service } from "./S3Service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [FileRecordController],
    providers: [FileRecordService, S3Service]
})
export class FileRecordModule {}