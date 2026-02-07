import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
  @Prop({ required: true })
  hari: string; // Senin, Selasa, dll

  @Prop({ required: true })
  jam: string; // 07:00 - 09:00

  @Prop({ required: true })
  kelas: string; // RPL, AKL, dll

  @Prop({ required: true })
  mapel: string;

  @Prop()
  guru: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
