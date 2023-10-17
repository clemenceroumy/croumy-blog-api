import {Controller, Get} from '@nestjs/common';
import {NotionService} from "./notion.service";

@Controller('notion')
export class NotionController {
    constructor(private notionService: NotionService) {}

    @Get("manga")
    getMangas() {
        return this.notionService.getMangas();
    }
}
