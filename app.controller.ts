import {Controller, Get, Query} from '@nestjs/common';
import {AppService} from './app.service';
import config from "./config"

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get("/instagram-webhook")
    webhookInstagram(
        @Query('hub.challenge') challenge: string,
        @Query("hub.verify_token") token: string,
        @Query("hub.mode") mode: string
    ): string {
        if (
            mode == 'subscribe' &&
            token == config.INSTAGRAM_WEBHOOK_TOKEN
        ) {
            return challenge;
        } else {
            return "Error, wrong validation token";
        }
    }
}
