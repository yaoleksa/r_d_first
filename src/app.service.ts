import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "This is our internet shop. There are four pages: - /users; -/products; -/orders/:userId; -/graphql";
  }
  helloMe(): string {
    return 'Hello Oleksa!';
  }
}
