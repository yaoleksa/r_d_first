import {
    Controller, 
    Post, 
    Body, 
    Get, 
    UseGuards,
    Req
} from "@nestjs/common";
import { FileRecordService } from "./FileRecordService";
import { InitUploadDTO } from "./dto";
import { FileRecord } from "../../file-storage/FileRecord";
import { JwtGuard } from "./guards/JwtGuard";

@Controller('files')
export class FileRecordController {
    constructor(private fileRecordService: FileRecordService) {}
    // To inform client about service logic
    @Get()
    async getExplanation(): Promise<FileRecord[]> {
        return this.fileRecordService.getFilesMetadata();
    }
    // Returns presign URL
    @UseGuards(JwtGuard)
    @Post('presign')
    async initUpload(@Req() request, @Body() dto: InitUploadDTO) {
        return this.fileRecordService.initUpload(request.user.sub, dto);
    }
}
