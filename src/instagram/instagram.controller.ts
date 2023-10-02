import {Controller, Get} from '@nestjs/common';
import {StorageService} from "../storage/storage.service";
import {InstagramService} from "./instagram.service";
import {Cron} from "@nestjs/schedule";

@Controller('instagram')
export class InstagramController {
    constructor(
        private instagramService: InstagramService,
        private storageService: StorageService
    ) {
    }

    @Cron("0 0 17 * * *",{timeZone: 'Europe/Paris'})
    async uploadToStorage() {
        const data = await this.instagramService.getInstagramPictures("");
        if(data === null) return console.error('Error while fetching instagram data');

        let storageFiles = await this.storageService.getAllFiles('instagram/');
        let instagramFiles = data.data.user.edge_owner_to_timeline_media.edges;

        let uploadedStorageNumber = storageFiles.length;
        let instagramNumber = data.data.user.edge_owner_to_timeline_media.count;

        if (uploadedStorageNumber < instagramNumber) {
            let filesToUpload = instagramFiles.filter(instaFile =>
                storageFiles.some(storageFile => storageFile.name.includes(instaFile.node.id)) === false
            );
            console.log(`${filesToUpload.length} new posts detected : ${filesToUpload.map(file => file.node.id).join('\n')}`);

            // UPLOAD FILES TO STORAGE
            await Promise.all(filesToUpload.map(file => {
                this.storageService.uploadFileFromUrl(
                    file.node.display_url,
                    `instagram/${file.node.fileName}`,
                    {
                        metadata: {
                            shortcode: file.node.shortcode,
                            likes: file.node.edge_media_preview_like.count
                        }
                    }
                )
            }));
            console.log('Files uploaded !')
        } else {
            console.log('Up to date, updating metadata...');
            await Promise.all(storageFiles.map(async file => {
                const instaFile = instagramFiles.find(instaFile => instaFile.node.id === file.name.split('/')[1].split('-')[0]);

                await file.setMetadata({
                    metadata: {
                        shortcode: instaFile.node.shortcode,
                        likes: instaFile.node.edge_media_preview_like.count,
                    }
                });
            }));
            console.log('Metadata updated !')
        }
    }
}
