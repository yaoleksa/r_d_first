import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <pre>
        This is our internet shop. There are next endpoints:
          /user
          /products
          /orders/:userId
          /files [GET] /presign [POST] /files/auth/login [POST]
    </pre>
    `;
  }
  helloMe(): string {
    return 'Hello Oleksa!';
  }
}
