import {
    Controller, 
    Post, 
    Body, 
    Get, 
    UseGuards,
    Req,
    Query
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
    async initUpload(@Req() request, @Body() dto: InitUploadDTO): Promise<Object> {
        return this.fileRecordService.initUpload(request.user.sub, dto);
    }
    // Check ownership, change status
    @UseGuards(JwtGuard)
    @Post('complete')
    async generateView(@Req() request, @Query('id') id: string): Promise<string> {
        return this.fileRecordService.generateView(request.user.sub, parseInt(id));
    }
}
