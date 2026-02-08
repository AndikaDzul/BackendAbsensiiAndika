import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfigDocument = Config & Document;

@Schema()
export class Config {
  @Prop()
  lat: number;

  @Prop()
  lng: number;

  @Prop({ default: 50 })
  radius: number;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
