import {Injectable} from '@nestjs/common';
import {getStorage} from "firebase-admin/storage";
import * as fs from "fs";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class StorageService {
    bucket() {
        return getStorage().bucket()
    };

    constructor(private httpService: HttpService) {
    }

    async uploadFileFromUrl(url: string, destinationPath: string, metadata: {} = {}): Promise<void> {
        const response = await this.httpService.axiosRef(url, {responseType: 'stream'});

        const file = this.bucket().file(destinationPath, metadata);

        await new Promise<void>((resolve, reject) => {
            response.data
                .pipe(file.createWriteStream())
                .on('error', reject)
                .on('finish', resolve);
        });
    }

    async getAllFiles(path: string) {
        let [files] = await this.bucket().getFiles({prefix: path});
        // exclude folder
        return files.filter(file => file.name !== path);
    }
}
