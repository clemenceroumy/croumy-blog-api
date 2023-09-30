import {Controller, Get} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import InstagramResponse from "./models/InstagramResponse";
import {ConfigService} from "@nestjs/config";
import {StorageService} from "../storage/storage.service";
import {InstagramService} from "./instagram.service";

@Controller('instagram')
export class InstagramController {
    constructor(
        private httpService: HttpService,
        private instagramService: InstagramService,
        private configService: ConfigService,
        private storageService: StorageService
    ) {}

    //@Cron('TZ=Europe/Paris 0 17 * * *')
    @Get('/')
    async uploadToStorage() {
        const data = await this.instagramService.getInstagramPictures("");

        let storageFiles= await this.storageService.getAllFiles('instagram/');
        let instagramFiles= data.data.user.edge_owner_to_timeline_media.edges;

        let uploadedStorageNumber= storageFiles.length;
        let instagramNumber= data.data.user.edge_owner_to_timeline_media.count;

        if(uploadedStorageNumber < instagramNumber) {
            let filesToUpload = instagramFiles.filter(instaFile =>
                storageFiles.some(storageFile => storageFile.name.includes(instaFile.node.id)) === false
            );
            console.log(`${filesToUpload.length} new posts detected : ${filesToUpload.map(file => file.node.id).join('\n')}`);
        } else {
            console.log('Up to date, all post are already uploaded')
        }
    }
}
