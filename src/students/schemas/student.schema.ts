import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  nis: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  class: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: '' })
  status: string;

  @Prop({ type: Array, default: [] })
  attendanceHistory: any[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
