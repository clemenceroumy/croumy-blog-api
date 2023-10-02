import { Module } from '@nestjs/common';
import {HltbController} from "./hltb.controller";
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import {StorageService} from "../storage/storage.service";
import { HltbService } from './hltb.service';

@Module({
  imports: [HttpModule],
  controllers: [HltbController],
  providers: [StorageService, HltbService],
})
export class HltbModule {}
