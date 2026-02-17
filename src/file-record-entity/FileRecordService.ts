import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { FileRecord } from "../../file-storage/FileRecord";
import { InitUploadDTO } from "./dto";
import { S3Service } from "./S3Service";

@Injectable()
export class FileRecordService {

    constructor(private s3service: S3Service, private dataSource: DataSource) {}

    async initUpload(initUploadDTO: InitUploadDTO) {
        const fileRecordRepository = this.dataSource.getRepository(FileRecord);
        const s3response = await this.s3service.generatePresignedUrl(
            initUploadDTO.fileName,
            initUploadDTO.contentType,
            initUploadDTO.size
        );
        const file = await fileRecordRepository.save({
            ownerId: initUploadDTO.ownerId,
            entityId: initUploadDTO.entityId,
            key: s3response.key,
            contentType: initUploadDTO.contentType,
            size: initUploadDTO.size,
        });
        return {
            fileId: file.id,
            url: s3response.uploadUrl
        }
    }
}