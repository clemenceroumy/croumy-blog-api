import { Injectable } from '@nestjs/common';
import {getStorage} from "firebase-admin/storage";
import * as fs from "fs";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class StorageService {
    bucket() { return getStorage().bucket() };

    constructor(private httpService: HttpService) {}

    async downloadImageFromUrl(url: string, fileName: string) {
        const writer = fs.createWriteStream(fileName);

        const response = await this.httpService.axiosRef({
            url: url,
            method: 'GET',
            responseType: 'stream',
        });

        response.data.pipe(writer);

        writer.close()
    }

    async uploadFile(file: Express.Multer.File, destination: string) {
        await this.bucket().upload(`instagram/${file.path}`, {
            destination: destination,
            metadata: {
                contentType: file.mimetype,
            }
        })
    }

    async getAllFiles(path: string) {
        let [files] = await this.bucket().getFiles({prefix: path});
        // exclude folder
        return files.filter(file => file.name !== path);
    }
}
