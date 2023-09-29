import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/instagram-webhook")
  webhookInstagram(@Query('hub.challenge') challenge: String, @Query("hub.verify_token") token: String): string {
    console.log(challenge);
    console.log(token);
    return "ok"
  }
}
