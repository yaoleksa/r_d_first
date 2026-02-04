import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "This is our internet shop. There are three pages: - /users; -/products; -/orders";
  }
  helloMe(): string {
    return 'Hello Oleksa!';
  }
}
