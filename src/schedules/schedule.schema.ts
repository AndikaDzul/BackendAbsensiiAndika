import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema({ timestamps: true })
export class Schedule extends Document {
  @Prop({ required: true })
  mapel: string;

  @Prop({ required: true })
  guru: string;

  @Prop({ required: true })
  hari: string;

  @Prop({ required: true })
  jam: string;

  @Prop({ required: true })
  kelas: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
