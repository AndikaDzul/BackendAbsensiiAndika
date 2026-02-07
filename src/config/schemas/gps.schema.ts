import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GpsDocument = Gps & Document;

@Schema({ collection: 'gps' })
export class Gps {
  @Prop({ required: true })
  lat: string;

  @Prop({ required: true })
  lng: string;

  @Prop({ required: true })
  radius: number;
}

export const GpsSchema = SchemaFactory.createForClass(Gps);
