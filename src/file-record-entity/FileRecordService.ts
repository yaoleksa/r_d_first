import { ForbiddenException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { FileRecord, Status } from "../../file-storage/FileRecord";
import { InitUploadDTO } from "./dto";
import { S3Service } from "./S3Service";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class FileRecordService {

    constructor(
        private s3service: S3Service, 
        private dataSource: DataSource,
        private s3client: S3Client
    ) {}

    async getFilesMetadata(): Promise<FileRecord[]> {
        return this.dataSource.getRepository(FileRecord).find();
    }

    async initUpload(userId: string, initUploadDTO: InitUploadDTO): Promise<Object> {
        const fileRecordRepository = this.dataSource.getRepository(FileRecord);
        const s3response = await this.s3service.generatePresignedUrl(
            initUploadDTO.fileName,
            initUploadDTO.contentType,
            initUploadDTO.size
        );
        const file = await fileRecordRepository.save({
            ownerId: userId,
            entityId: initUploadDTO.entityId,
            key: s3response.key,
            contentType: initUploadDTO.contentType,
            size: initUploadDTO.size,
        });
        return {
            fileId: file.id,
            key: s3response.key,
            url: s3response.uploadUrl,
            contentType: initUploadDTO.contentType
        }
    }

    // To check ownership
    async checkFileOwnership(userId: string, id: number): Promise<Boolean> {
        const file = await this.dataSource.getRepository(FileRecord).findBy({
            id,
            ownerId: userId
        });
        return !!file;
    }
    // Generate presign URL to view file
    async generateView(ownerId: string, entityId: number): Promise<string> {
        // Create a new FileRecordRepository instance to perform database action with entity
        const fileRecordRepository: Repository<FileRecord> = await this.dataSource.getRepository(FileRecord);
        const file = await fileRecordRepository.findOne({
            where: {
                ownerId,
                entityId
            }
        });
        if(!file) {
            throw new ForbiddenException('You are not the owner of this file!');
        }
        // Change status of file
        file.status = Status.READY;
        // Save file with new status
        fileRecordRepository.save(file);
        const getCommand = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.key
        });
        return await getSignedUrl(this.s3client, getCommand);
    }
}