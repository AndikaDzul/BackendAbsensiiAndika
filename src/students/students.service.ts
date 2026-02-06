import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Student, StudentDocument } from './students.schema'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private model: Model<StudentDocument>,
  ) {}

  async create(data: Partial<Student>) {
    if (!data.password) throw new BadRequestException('Password wajib')
    data.password = await bcrypt.hash(data.password, 10)
    return this.model.create(data)
  }

  async login(email: string, password: string) {
    const student = await this.model.findOne({ email })
    if (!student) throw new BadRequestException('Email tidak ditemukan')

    const ok = await bcrypt.compare(password, student.password)
    if (!ok) throw new BadRequestException('Password salah')

    return student
  }

  async findAll() {
    return this.model.find().sort({ name: 1 })
  }

  // =========================
  // ABSENSI (AMAN & KONSISTEN)
  // =========================
  async updateStatus(nis: string, status: string, method = 'manual') {
    const student = await this.model.findOne({ nis })
    if (!student) throw new NotFoundException('Siswa tidak ditemukan')

    const now = new Date()
    const today = now.toISOString().slice(0, 10) // YYYY-MM-DD

    let record = student.attendanceHistory.find(r => r.day === today)

    if (record) {
      record.status = status
      record.method = method
      record.date = now
    } else {
      student.attendanceHistory.push({
        day: today,
        date: now,
        status,
        method,
      })
    }

    student.status = status
    await student.save()
    return student
  }

  // =========================
  // RESET ABSEN HARI INI
  // =========================
  async resetTodayAttendance(nis: string) {
    const student = await this.model.findOne({ nis })
    if (!student) throw new NotFoundException('Siswa tidak ditemukan')

    const today = new Date().toISOString().slice(0, 10)

    student.attendanceHistory = student.attendanceHistory.filter(
      r => r.day !== today,
    )

    student.status = ''
    await student.save()

    return { message: 'Absensi hari ini berhasil dihapus' }
  }

  async resetAllAttendance() {
    const today = new Date().toISOString().slice(0, 10)
    const students = await this.model.find()

    await Promise.all(
      students.map(async s => {
        s.attendanceHistory = s.attendanceHistory.filter(
          r => r.day !== today,
        )
        s.status = ''
        await s.save()
      }),
    )

    return { message: 'Semua absensi hari ini berhasil dihapus' }
  }

  // =========================
  // HISTORY (URUT TERBARU)
  // =========================
  async getAttendance(nis: string) {
    const student = await this.model.findOne({ nis })
    if (!student) throw new NotFoundException('Siswa tidak ditemukan')

    return student.attendanceHistory
      .filter(r => r.date)
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .map(r => ({
        ...r,
        createdAt: r.date,
        dayName: new Date(r.date).toLocaleDateString('id-ID', {
          weekday: 'long',
        }),
      }))
  }

  // =========================
  // LAPORAN HARIAN
  // =========================
  async getDailyReport(day: string) {
    const students = await this.model.find()

    return students.map(s => {
      const record = s.attendanceHistory.find(r => {
        if (!r.date) return false
        const hari = new Date(r.date).toLocaleDateString('id-ID', {
          weekday: 'long',
        })
        return hari.toLowerCase() === day.toLowerCase()
      })

      return {
        nis: s.nis,
        name: s.name,
        class: s.class,
        status: record?.status || '-',
        mapel: '-',
        guru: '-',
      }
    })
  }
}
