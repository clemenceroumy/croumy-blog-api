import { Controller, Get, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/instagram-webhook")
  webhookInstagram(@Req() request: Request): string {
    print(request);
    return
  }
}
