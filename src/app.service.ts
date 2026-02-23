import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <pre>
        This is our internet shop. There are next endpoints:
          /users
          /products
          /orders/:userId
          /files [GET] /files/presign [POST] /files/auth/login [POST] /files/complete [POST]
          /graphql
    </pre>
    `;
  }
  helloMe(): string {
    return 'Hello Oleksa!';
  }
}
