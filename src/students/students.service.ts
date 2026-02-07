import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Student, StudentDocument } from './students.schema';

export interface AttendanceReport {
  nis: string;
  name: string;
  class: string;
  status: string;
  mapel?: string;
  guru?: string;
  jam?: string;
}

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}

  async findAll(): Promise<StudentDocument[]> {
    return this.studentModel.find().exec();
  }

  async findOne(nis: string): Promise<StudentDocument> {
    const student = await this.studentModel.findOne({ nis }).exec();
    if (!student) throw new NotFoundException('Siswa tidak ditemukan');
    return student;
  }

  async create(data: { nis: string; name: string; class: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const student = new this.studentModel({ ...data, password: hashedPassword });
    return student.save();
  }

  async remove(nis: string) {
    return this.studentModel.findOneAndDelete({ nis }).exec();
  }

  async login(email: string, password: string): Promise<StudentDocument> {
    const student = await this.studentModel.findOne({ email });
    if (!student) throw new NotFoundException('Email tidak ditemukan');
    const match = await bcrypt.compare(password, student.password);
    if (!match) throw new Error('Password salah');
    return student;
  }

  async markAttendance(
    nis: string,
    attendance: {
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
  ): Promise<StudentDocument> {
    const student = await this.findOne(nis);
    student.status = 'Hadir';
    student.attendanceHistory.push(attendance);
    return student.save();
  }

  async resetAllAttendance(): Promise<void> {
    const students = await this.findAll();
    for (const s of students) {
      s.status = '-';
      s.attendanceHistory = [];
      await s.save();
    }
  }

  async getDailyReport(day: string): Promise<AttendanceReport[]> {
    const students = await this.findAll();
    const report: AttendanceReport[] = [];
    for (const s of students) {
      const a = s.attendanceHistory.filter(at => at.day === day);
      if (a.length === 0) {
        report.push({ nis: s.nis, name: s.name, class: s.class, status: '-' });
      } else {
        for (const sc of a) {
          report.push({
            nis: s.nis,
            name: s.name,
            class: s.class,
            status: sc.status,
            mapel: sc.mapel || '',
            guru: sc.guru || '',
            jam: sc.jam || ''
          });
        }
      }
    }
    return report;
  }
}
