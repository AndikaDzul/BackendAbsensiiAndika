import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gps, GpsDocument } from './gps.schema';

@Injectable()
export class ConfigService {
  constructor(@InjectModel(Gps.name) private readonly gpsModel: Model<GpsDocument>) {}

  async getGps(): Promise<Gps> {
    const gps = await this.gpsModel.findOne().exec();
    return gps || { lat: 0, lng: 0, radius: 50 };
  }

  async setGps(data: { lat: number | string; lng: number | string; radius: number | string }): Promise<Gps> {
    // Konversi string ke number agar type-safe
    const lat = typeof data.lat === 'string' ? parseFloat(data.lat) : data.lat;
    const lng = typeof data.lng === 'string' ? parseFloat(data.lng) : data.lng;
    const radius = typeof data.radius === 'string' ? parseFloat(data.radius) : data.radius;

    let gps = await this.gpsModel.findOne().exec();
    if (!gps) {
      gps = new this.gpsModel({ lat, lng, radius });
    } else {
      gps.lat = lat;
      gps.lng = lng;
      gps.radius = radius;
    }
    return gps.save();
  }
}
