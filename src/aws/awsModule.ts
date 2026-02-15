import { Module } from "@nestjs/common";
import { FileRecordService } from "./awsService";
import { FileRecordController } from "./awsController";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [FileRecordController],
    providers: [FileRecordService]
})
export class FileRecordModule {}