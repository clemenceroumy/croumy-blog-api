import {GameResponse} from "./GameListResponse";

export default class Game {
    id: number;
    name: string;
    platform: string;
    picture: string;
    completedDate: Date;
    totalTime: number;

    constructor(response: GameResponse) {
        this.id = response.id;
        this.name = response.custom_title;
        this.platform = response.platform;
        this.picture = `https://howlongtobeat.com/games/${response.game_image}`;
        this.completedDate = new Date(response.date_complete);
        this.totalTime = response.invested_pro;
    }
}