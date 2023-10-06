export class SpotifyResponse {
    tracks: {
        next: string;
        total: number;
        items: TracksItemResponse[]
    }
}

export class TracksItemResponse {
    track: TrackResponse
}

export class TrackResponse {
    id: string
    album: AlbumResponse
    artists: { name: string }[]
    duration_ms: number
    external_urls: { spotify: string }  //link redirect on spotify song
    preview_url: string // 30sec audio preview
    name: string
    is_local: boolean
}

export class AlbumResponse {
    images: { url: string }[]
    name: string
}