import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export enum Status {
    PENDING = 'pending',
    READY = 'ready'
}

export enum Visibility {
    PUBLIC = 'public',
    PRIVATE = 'private'
}

@Entity()
export class FileRecord {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    ownerId: string;
    @Column()
    entityId: number;
    @Column()
    key: string;
    @Column()
    contentType: string;
    @Column({ nullable: true })
    size?: number;
    @Column({ type: 'enum', enum: Status, default: Status.PENDING })
    status: Status;
    @Column({ type: 'enum', enum: Visibility, default: Visibility.PRIVATE })
    visibility: Visibility;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}