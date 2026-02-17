import { Controller, Post, Body, Headers, Get } from "@nestjs/common";
import { FileRecordService } from "./FileRecordService";
import { InitUploadDTO } from "./dto";

@Controller('files')
export class FileRecordController {
    constructor(private fileRecordService: FileRecordService) {}
    // To inform client about service logic
    @Get()
    async getExplanation(): Promise<string> {
        return 'There is available only POST HTTP request with /presign endpiont to get file presign upload URL';
    }
    // Returns presign URL
    @Post('presign')
    async initUpload(@Headers('authorization') authorization: string, @Body() dto: InitUploadDTO) {
        return this.fileRecordService.initUpload(dto);
    }
}
