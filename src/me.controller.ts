import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('me')
export class MeController {
    constructor(private readonly appservice: AppService) {}

    @Get()
    greetingsToMe(): string {
        return 'Hello Oleksa!';
    }
    @Get('estimate')
    setMark(): string {
        return 'Well done!';
    }
}