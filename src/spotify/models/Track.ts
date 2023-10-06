// tracks.next for pagination
import {TrackResponse} from "./SpotifyResponse";

export default class Track {
    id: string;
    previewUrl: string;
    name: string;
    durationMs: number
    spotifyLink: string
    artistsNames: string[]
    albumPicture: string
    albumName: string

    constructor(data: TrackResponse) {
        this.id = data.id;
        this.previewUrl = data.preview_url;
        this.name = data.name;
        this.durationMs = data.duration_ms;
        this.spotifyLink = data.external_urls.spotify;
        this.artistsNames = data.artists.map(artist => artist.name);
        this.albumPicture = data.album.images[0].url;
        this.albumName = data.album.name;
    }
}