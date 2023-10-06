import {Controller, Get} from '@nestjs/common';
import {SpotifyService} from "./spotify.service";

@Controller('spotify')
export class SpotifyController {
    constructor(private spotifyService: SpotifyService) {}
    @Get()
    getPlaylist() {
        return this.spotifyService.getPlaylist()
    }
}
