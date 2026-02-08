import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

export interface Attendance {
  status: string;
  timestamp: Date;
  method?: string;
}

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true, unique: true })
  nis: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  class: string;

  @Prop({ required: true })
  password: string;  // <-- wajib ditambahkan

  @Prop({ default: '' })
  status: string;

  @Prop({ type: [{ status: String, timestamp: Date, method: String }] })
  attendanceHistory: Attendance[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
