import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {firstValueFrom} from "rxjs";
import {SpotifyResponse} from "./models/SpotifyResponse";
import {SPOTIFY_API_URL, SPOTIFY_LIMIT, SPOTIFY_PLAYLIST_ROUTE} from "./constants";
import Track from "./models/Track";

@Injectable()
export class SpotifyService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) {}

    async getToken(): Promise<string> {
        const clientId = this.configService.get<string>('spotify.clientId');
        const clientSecret = this.configService.get<string>('spotify.clientSecret');

        const result = await firstValueFrom(this.httpService.post('https://accounts.spotify.com/api/token',
            {grant_type: 'client_credentials'},
            {
                headers: {
                    'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }))

        return result.data.access_token;
    }

    async getPlaylist(): Promise<Track[]> {
        const token = await this.getToken();

        let hasNext = true;
        let iteration = 0;
        let tracks = [] as Track[];

        do {
            const result = await firstValueFrom(this.httpService.get<SpotifyResponse>(`${SPOTIFY_API_URL}${SPOTIFY_PLAYLIST_ROUTE}?offset=${iteration * SPOTIFY_LIMIT}&limit=${SPOTIFY_LIMIT}`,{
                headers: {"Authorization": `Bearer ${token}`}
            }));

            tracks.push(...result.data.tracks.items
                .filter(item => !item.track.is_local)
                .map(item => new Track(item.track))
            );

            iteration++;
            hasNext = result.data.tracks.total > iteration * SPOTIFY_LIMIT;
        } while (hasNext)

        return tracks;
    }
}
