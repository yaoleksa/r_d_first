import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // RabbitMQ microservice
  const transporter = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'orders_queue'
    }
  });
  // Start RabbitMQ microservice
  transporter.listen();
  // NestJS application
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? 'localhost';
  app.enableVersioning({
    type: VersioningType.URI
  });
  await app.listen(port, () => {
    console.log(`App is running on http://${host}:${port}/`);
  });
}
bootstrap();
