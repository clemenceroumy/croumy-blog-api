import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {firstValueFrom} from "rxjs";
import {GameListResponse} from "./models/GameListResponse";
import Game from "./models/Game";
import UserAgent from 'user-agents';

@Injectable()
export class HltbService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
    }

    async getCompletedGames() {
        const userId = this.configService.get('hltb.userId');
        const route = `https://howlongtobeat.com/api/user/${userId}/games/list`
        const { data } = await firstValueFrom(this.httpService.post<GameListResponse>(route, {
            "user_id": userId,
            "lists": ["completed"],
            "set_playstyle": "comp_all",
            "name": "",
            "platform": "",
            "storefront": "",
            "limit": "1000" // IM FAR FROM 1000 GAMES COMPLETED, SO IT WILL WORK LIKE THIS FOR A WHILE AHAHAH
        }, {
            headers: {
                'user-agent': new UserAgent().toString(),
                'origin': 'https://howlongtobeat.com',
                'referer': 'https://howlongtobeat.com'
            }
        }));

        return data.data.gamesList.map(game => new Game(game));
    }
}
