import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import InstagramResponse from "./models/InstagramResponse";
import {firstValueFrom} from "rxjs";
import InstagramConfig from "./constants";
import UserAgent from "user-agents";

@Injectable()
export class InstagramService {
    constructor(private httpService: HttpService) {
    }

    async getInstagramPictures(mostRecentUploadedId: string): Promise<InstagramResponse> {
        let iteration = 1
        let end_cursor = null as string
        let response = null as InstagramResponse
        let noNeedToContinue = false

        do {
            const route = `${InstagramConfig.INSTAGRAM_QUERY_ROUTE}?query_hash=${InstagramConfig.INSTAGRAM_GET_PICTURES_QUERY_HASH}&variables={"id":"${InstagramConfig.INSTAGRAM_USER_ID}","first":${InstagramConfig.LIMIT}${end_cursor != null ? `,"after":"${end_cursor}"` : ''}}`
            const {data} = await firstValueFrom(this.httpService.get<InstagramResponse>(route)).catch(err => {
                return {data: null}
            })
            if(data === null) break;

            // CHECK IF MOST RECENT FILE UPLOADED IN STORAGE IS IN THIS BATCH,
            // IF SO, NO NEED TO CONTINUE AS LATEST FILES ARE ALREADY UPLOADED TOO
            if (data.data.user.edge_owner_to_timeline_media.edges.map(edge => edge.node.id).includes(mostRecentUploadedId)) {
                noNeedToContinue = true
            }
            // SET END CURSOR FOR NEXT ITERATION
            end_cursor = data.data.user.edge_owner_to_timeline_media.page_info.end_cursor
            // SET RESPONSE WITH THIS BATCH OF DATA (ONLY IF NOT FIRST ITERATION)
            // ELSE SET RESPONSE WITH FIRST BATCH OF DATA
            if (iteration > 1) {
                response.data.user.edge_owner_to_timeline_media.page_info = data.data.user.edge_owner_to_timeline_media.page_info
                response.data.user.edge_owner_to_timeline_media.edges.push(...data.data.user.edge_owner_to_timeline_media.edges)
            } else response = data

            iteration++
        } while (response.data.user.edge_owner_to_timeline_media.page_info.has_next_page === true && !noNeedToContinue)


        return response !== null ? new InstagramResponse(response) : null
    }
}
