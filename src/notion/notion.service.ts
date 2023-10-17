import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import NotionConfig from "./constants";
import {firstValueFrom} from "rxjs";
import {ConfigService} from "@nestjs/config";
import MangaDatabaseResponse from "./models/MangaDatabaseResponse";
import Manga from "./models/Manga";

@Injectable()
export class NotionService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    async getMangas(): Promise<Manga[]> {
        const token = this.configService.get('notion.token');

        let nextCursor: string;
        let hasMore: boolean = false;
        let body = {
            "filter": {
                "property": "Type",
                "select": {
                    "equals": "Manga"
                }
            },
            "page_size": 100
        }

        let result: Manga[] = [];

        do {
            if(nextCursor != undefined) body["start_cursor"] = nextCursor;

            const response = await firstValueFrom(this.httpService.post<MangaDatabaseResponse>(
                NotionConfig.MANGA_QUERY_ROUTE,
                body, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Notion-Version": "2022-02-22"
                }
            }));

            result.push(...response.data.results.map(result => new Manga(result.properties)));

            nextCursor = response.data.next_cursor;
            hasMore = response.data.has_more;
        } while (hasMore)

        return result;
    }
}
