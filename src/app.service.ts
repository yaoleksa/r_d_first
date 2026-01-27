import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  helloMe(): string {
    return 'Hello Oleksa!';
  }
}
