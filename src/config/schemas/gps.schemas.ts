// src/config/gps.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GpsDocument = Gps & Document;

@Schema()
export class Gps {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;

  @Prop({ required: true, default: 50 })
  radius: number;
}

export const GpsSchema = SchemaFactory.createForClass(Gps);
