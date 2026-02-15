import { Controller, Get } from "@nestjs/common";
import { FileRecordService } from "./awsService";

@Controller('/files')
export class FileRecordController {
    constructor(private fileRecordService: FileRecordService) {}
    @Get()
    async showFiles() {
        this.fileRecordService.showFile();
    }
}
