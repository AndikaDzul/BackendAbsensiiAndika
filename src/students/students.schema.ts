import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

export interface AttendanceRecord {
  day: string; // YYYY-MM-DD (WAJIB untuk filter hari)
  date: Date;  // timestamp scan
  status: string; // Hadir, Izin, Sakit, Alfa
  method: string; // qr, manual, system
}


@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true, unique: true })
  nis: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  status: string; // status terakhir hari ini

  @Prop({ type: [Object], default: [] })
  attendanceHistory: AttendanceRecord[];

  @Prop({ default: '' })
  photo: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
