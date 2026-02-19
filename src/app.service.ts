import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <pre>
        This is our internet shop. There are next pages:
          /user
          /products
          /orders/:userId
          /files    [Only the POST HTTP request available]
    </pre>
    `;
  }
  helloMe(): string {
    return 'Hello Oleksa!';
  }
}
