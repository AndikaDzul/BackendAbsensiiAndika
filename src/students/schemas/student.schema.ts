import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as bcrypt from 'bcrypt'

export type StudentDocument = Student & Document

export interface AttendanceHistory {
  day: string
  date: Date
  status: string
  method: string
  timestamp: Date
  teacherToken?: string
  mapel?: string
  guru?: string
  jam?: string
}

@Schema({ timestamps: true })
export class Student {

  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  nis: string

  @Prop({ default: '' })
  class: string

  // 🔴 FIX PENTING DI SINI
  @Prop({
    required: false,
    unique: true,
    sparse: true, // ⬅️ INI WAJIB
    default: null,
  })
  email?: string

  @Prop({ required: true })
  password: string

  @Prop({ default: '' })
  status: string

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
    default: [],
  })
  attendanceHistory: AttendanceHistory[]
}

export const StudentSchema = SchemaFactory.createForClass(Student)

// ✅ PRE SAVE AMAN (TIDAK ADA next ERROR)
StudentSchema.pre<StudentDocument>('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }

  // email OPTIONAL → biarkan undefined (AMAN DENGAN sparse: true)
  if (!this.email) {
    this.email = undefined
  }
})

