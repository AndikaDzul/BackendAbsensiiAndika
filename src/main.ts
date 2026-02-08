import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as os from 'os';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // =====================
    // Prefix API
    // =====================
    app.setGlobalPrefix('api');

    // =====================
    // CORS
    // =====================
    app.enableCors({
      origin: '*', // Bisa diubah sesuai domain frontend
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // =====================
    // Global Validation Pipe
    // =====================
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    // =====================
    // Port
    // =====================
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    // =====================
    // Listen di semua interface agar bisa diakses dari LAN
    // =====================
    await app.listen(port, '0.0.0.0');

    // =====================
    // Tampilkan IP LAN
    // =====================
    const interfaces = os.networkInterfaces();
    let localIp = 'localhost';

    for (const name of Object.keys(interfaces)) {
      for (const net of interfaces[name] || []) {
        if (net.family === 'IPv4' && !net.internal) {
          localIp = net.address;
          break;
        }
      }
    }

    console.log(`🚀 Backend running:`);
    console.log(`👉 Local   : http://localhost:${port}/api`);
    console.log(`👉 Network : http://${localIp}:${port}/api`);

    // =====================
    // Catatan Reset Kehadiran:
    // POST /api/students/reset       -> Reset semua siswa
    // POST /api/students/reset/:nis  -> Reset 1 siswa
    // Frontend harus memanggil endpoint POST, bukan PATCH
    // =====================

  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
}

bootstrap();
