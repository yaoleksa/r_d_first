import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "This is our internet shop. There are five pages: - /users; -/products; -/orders/:userId; -/graphql; -/files";
  }
  helloMe(): string {
    return 'Hello Oleksa!';
  }
}
