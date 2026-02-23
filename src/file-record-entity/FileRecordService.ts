import { BadRequestException, ForbiddenException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { FileRecord, Status } from "../../file-storage/FileRecord";
import { InitUploadDTO } from "./dto";
import { S3Service } from "./S3Service";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Product } from "../../ecomerce";

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

    async initUpload(userId: string, initUploadDTO: InitUploadDTO): Promise<any> {
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

    // Generate presign URL to view file
    async generateView(ownerId: string, entityId: number): Promise<string> {
        // Create a new QueryRunner instance to perform multi-entity database operations
        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const file = await queryRunner.manager.findOne(FileRecord, {
                where: {
                    ownerId,
                    entityId
                }
            });
            if(!file) {
                throw new ForbiddenException('You are not the owner of this file!');
            }
            if(file.status !== Status.READY) {
                // Change status of file
                file.status = Status.READY;
                // Save file with new status
                await queryRunner.manager.save(file);
            }
            // Get product corresponding product record for update
            const correspondingProduct = await queryRunner.manager.findOne(Product, {
                where: {
                    id: entityId
                }
            });

            // Check if product exists
            if(!correspondingProduct) {
                throw new BadRequestException("Such product does not exist!");
            }

            const getCommand = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: file.key
            });
            // Get image url
            const imageSignedUrl = await getSignedUrl(this.s3client, getCommand, { expiresIn: 5 * 60 * 60 * 24 });
            // Update images array for the product
            correspondingProduct.images = [...(correspondingProduct.images || []), file.key];
            await queryRunner.manager.save(correspondingProduct);
            // Commit all changes
            await queryRunner.commitTransaction();
            // return url value
            return imageSignedUrl;
        } catch(err) {
            await queryRunner.rollbackTransaction();
            if(err instanceof HttpException) {
                throw err;
            }
            throw new InternalServerErrorException(err.message);
        } finally {
            await queryRunner.release()
        }
    }
}