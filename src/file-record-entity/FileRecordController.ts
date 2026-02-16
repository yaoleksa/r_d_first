import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { InitUploadDTO } from "./dto";
import { FileRecordService } from "./FileRecordService";

@Controller()
export class FileRecordController {
    constructor(private fileRecordService: FileRecordService) {}
    async initUpload(userId: number, dto: InitUploadDTO) {}
}
