import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ScheduleModule} from "@nestjs/schedule";
import {InstagramModule} from "./instagram/instagram.module";
import {ConfigModule} from "@nestjs/config";
import config from 'config';
import {HltbModule} from "./hltb/hltb.module";
import { SpotifyController } from './spotify/spotify.controller';
import {SpotifyModule} from "./spotify/spotify.module";
import {NotionModule} from "./notion/notion.module";

@Module({
    imports: [
        ConfigModule.forRoot(
            {
                isGlobal: true,
                load: [config]
            },
        ),
        ScheduleModule.forRoot(),
        InstagramModule,
        HltbModule,
        SpotifyModule,
        NotionModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
