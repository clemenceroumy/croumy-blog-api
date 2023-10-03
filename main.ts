import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import {cert, initializeApp} from 'firebase-admin/app';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  const appConfig = app.get(ConfigService);

  const firebaseServiceAccount = appConfig.get('firebase.service_account');

  initializeApp({
    credential: cert(JSON.parse(firebaseServiceAccount)),
    storageBucket: 'croumy-blog.appspot.com'
  })
  await app.listen(3000);
}

bootstrap();
