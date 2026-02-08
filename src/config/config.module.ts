import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { Gps, GpsSchema } from './schemas/gps.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gps.name, schema: GpsSchema }]),
  ],
  providers: [ConfigService],
  controllers: [ConfigController],
  exports: [ConfigService],
})
export class ConfigModule {}
