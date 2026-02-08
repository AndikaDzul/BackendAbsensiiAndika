import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

export interface AttendanceHistory {
  day: string;
  date: Date;
  status: string;
  method: string;
  timestamp: Date;
  teacherToken?: string;
  mapel?: string;
  guru?: string;
  jam?: string;
}

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  nis: string;

  @Prop({ default: '' })
  class: string; // Jurusan

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  status: string;

  @Prop({
    type: [
      {
        day: String,
        date: Date,
        status: String,
        method: String,
        timestamp: Date,
        teacherToken: String,
        mapel: String,
        guru: String,
        jam: String,
      },
    ],
  })
  attendanceHistory: AttendanceHistory[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
