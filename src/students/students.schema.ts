import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true, unique: true })
  nis: string;

  @Prop()
  name: string;

  @Prop()
  class: string;

  @Prop({ default: 'Belum Absen' })
  status: string;

  @Prop({ type: [{ status: String, timestamp: Date }] })
  attendanceHistory: { status: string; timestamp: Date }[];

  @Prop()
  createdAt?: Date;   // 🔹 tambahkan supaya TypeScript kenal
  @Prop()
  updatedAt?: Date;   // 🔹 tambahkan supaya TypeScript kenal
}

export const StudentSchema = SchemaFactory.createForClass(Student);
