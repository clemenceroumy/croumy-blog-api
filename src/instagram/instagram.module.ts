import { Module } from '@nestjs/common';
import {InstagramController} from "./instagram.controller";
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";
import {StorageService} from "../storage/storage.service";
import { InstagramService } from './instagram.service';

@Module({
  imports: [HttpModule],
  controllers: [InstagramController],
  providers: [StorageService, InstagramService],
})
export class InstagramModule {}
