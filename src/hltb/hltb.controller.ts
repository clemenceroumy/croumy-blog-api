import {Controller, Get} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {StorageService} from "../storage/storage.service";
import {HltbService} from "./hltb.service";
import {Cron} from "@nestjs/schedule";

@Controller('hltb')
export class HltbController {
    constructor(
        private hltbService: HltbService,
    ) {
    }

    @Get()
    async getCompletedGames() {
        return this.hltbService.getCompletedGames();
    }
}
