export class GameListResponse {
    data: Data;
}

export class Data {
    count: number;
    gamesList: GameResponse[];
}

export class GameResponse {
    id: number;
    custom_title: string;
    platform: string;
    play_storefront: string;
    list_playing: number;
    list_backlog: number;
    list_replay: number;
    list_custom: number;
    list_custom2: number;
    list_custom3: number;
    list_comp: number;
    list_retired: number;
    comp_main: number;
    comp_plus: number;
    comp_100: number;
    comp_speed: number;
    comp_speed100: number;
    comp_main_notes: string;
    comp_plus_notes: string;
    comp_100_notes: string;
    comp_speed_notes: string;
    comp_speed100_notes: string;
    invested_pro: number;
    invested_sp: number;
    invested_spd: number;
    invested_co: number;
    invested_mp: number;
    play_count: number;
    play_dlc: number;
    review_score: number;
    review_notes: string;
    retired_notes: string;
    date_complete: string;
    date_updated: string;
    play_video: string;
    play_notes: string;
    game_id: number;
    game_image: string;
    game_type: string;
    release_world: string;
    comp_all: number;
    comp_all_g: number;
    review_score_g: number;

    picture: string;
    timePlayed: number;
    completedDate: Date;
}