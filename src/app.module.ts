import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ScheduleModule} from "@nestjs/schedule";
import {InstagramModule} from "./instagram/instagram.module";
import {ConfigModule} from "@nestjs/config";
import config from 'config';
import {HltbModule} from "./hltb/hltb.module";

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
        HltbModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
