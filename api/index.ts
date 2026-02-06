import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';

// Inisialisasi Express
const server = express();

// Variable untuk menampung instance Nest agar tidak dibuat ulang terus (Cold Start Optimization)
let cachedApp: any;

export default async (req: any, res: any) => {
  if (!cachedApp) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );

    // Aktifkan CORS agar frontend bisa akses
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });

    await app.init();
    cachedApp = server;
  }

  // Teruskan request ke instance express yang sudah berisi NestJS
  return server(req, res);
};