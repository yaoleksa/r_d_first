// DTO for FileRecordControllers' POST HTTP request
export class InitUploadDTO {
    fileName: string;
    ownerId: number;
    entityId: number;
    contentType: string;
    size: number;
}