import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gps, GpsDocument } from './schemas/gps.schema';

@Injectable()
export class ConfigService {
  constructor(
    @InjectModel(Gps.name) private readonly gpsModel: Model<GpsDocument>,
  ) {}

  async getGps(): Promise<Gps> {
    const gps = await this.gpsModel.findOne().exec();
    return gps || { lat: '', lng: '', radius: 50 }; // default
  }

  async setGps(data: { lat: string; lng: string; radius: number }): Promise<Gps> {
    let gps = await this.gpsModel.findOne().exec();
    if (!gps) {
      gps = new this.gpsModel(data);
    } else {
      gps.lat = data.lat;
      gps.lng = data.lng;
      gps.radius = data.radius;
    }
    return gps.save();
  }
}
