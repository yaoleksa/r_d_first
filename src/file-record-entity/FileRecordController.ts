import { Controller, Post, Body, UseGuards, Headers, Get } from "@nestjs/common";
import { FileRecordService } from "./FileRecordService";
import { InitUploadDTO } from "./dto";
import { FileRecord } from "../../file-storage/FileRecord";

@Controller('files')
export class FileRecordController {
    constructor(private fileRecordService: FileRecordService) {}
    // To inform client about service logic
    @Get()
    async getExplanation(): Promise<string> {
        return 'There is available only POST HTTP request to get file presign upload URL';
    }
    // Returns presign URL
    @Post()
    async initUpload(@Headers('authorization') authorization: string, @Body() dto: InitUploadDTO) {
        return this.fileRecordService.initUpload(dto);
    }
}
