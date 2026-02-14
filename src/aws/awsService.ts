import { Injectable } from "@nestjs/common";
import { FileRecord } from "../../file-storage/FileRecord";
import { S3Service } from "./s3bucket";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FileRecordService {
    private s3service: S3Service;
    constructor(private configService: ConfigService) {
        this.s3service = new S3Service(configService);
    }
    async uploadFile() {
        this.s3service;
    }
    async showFile() {}
}