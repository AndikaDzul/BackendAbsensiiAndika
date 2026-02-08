import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Gps } from './schemas/gps.schemas';

@Controller('config') // => /api/config
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('gps')
  async getGps(): Promise<Gps> {
    return this.configService.getGps();
  }

  @Post('gps')
  async setGps(@Body() body: { lat: string; lng: string; radius: number }): Promise<Gps> {
    return this.configService.setGps(body);
  }
}
