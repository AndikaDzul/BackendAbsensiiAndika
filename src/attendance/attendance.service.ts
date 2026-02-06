import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Attendance, AttendanceDocument } from './schemas/attendance.schema'

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async scan(data: {
    nis: string
    name?: string
    status?: string
    time?: string
  }): Promise<Attendance> {
    if (!data.nis) {
      throw new BadRequestException('NIS wajib')
    }

    // ⬇️ JIKA time dikirim → pakai
    // ⬇️ JIKA tidak → pakai waktu sekarang
    const date = data.time ? new Date(data.time) : new Date()

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Format waktu tidak valid')
    }

    // 🔥 HARI OTOMATIS SESUAI TANGGAL
    const day = date.toLocaleDateString('id-ID', {
      weekday: 'long',
    })

    return this.attendanceModel.create({
      nis: data.nis,
      name: data.name || '',
      status: data.status || 'Hadir',
      time: date,
      day,
    })
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceModel.find().sort({ time: -1 })
  }

  async reportByDay(day: string): Promise<Attendance[]> {
    return this.attendanceModel.find({ day }).sort({ time: 1 })
  }

  async resetAll(): Promise<{ success: boolean }> {
    await this.attendanceModel.deleteMany({})
    return { success: true }
  }
}
