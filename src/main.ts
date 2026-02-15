import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
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
