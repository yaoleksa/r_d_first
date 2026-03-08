import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { Channel, ChannelModel, connect } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
    private connection: ChannelModel;
    private chanel: Channel;
    async onModuleDestroy() {
        // Destroy connection
        if(this.chanel) {
            await this.chanel.close();
        }
        if(this.connection) {
            await this.connection.close();
        }
    }
    async onModuleInit() {
        // Init connection
        this.connection = await connect(process.env.RABBITMQ_URL);
        this.chanel = await this.connection.createChannel();
    }
    async publish(queue: string, message: any) {
        this.chanel.sendToQueue(
            queue,
            Buffer.from(JSON.stringify(message)),
            { persistent: true }
        );
    }
}