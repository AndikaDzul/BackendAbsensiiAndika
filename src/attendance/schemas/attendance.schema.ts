import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type AttendanceDocument = Attendance & Document

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ required: true })
  nis: string

  @Prop()
  name: string

  @Prop({ default: 'Hadir' })
  status: string

  @Prop({ type: Date, required: true })
  time: Date

  @Prop({ required: true })
  day: string
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance)
