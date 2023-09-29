import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/instagram-webhook")
  webhookInstagram(@Param('hub.challenge') challenge: String, @Param("hub.verify_token") token: String): string {
    console.log(challenge);
    console.log(token);
    return
  }
}
