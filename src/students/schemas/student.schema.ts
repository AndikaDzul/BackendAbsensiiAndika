import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
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

  @Prop({ default: '-' })
  status: string;

  @Prop({ type: Array, default: [] })
  attendanceHistory: Array<{
    day: string;
    date: Date;
    status: string;
    method: string;
    timestamp: Date;
    teacherToken?: string;
    mapel?: string;
    guru?: string;
    jam?: string;
  }>;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
