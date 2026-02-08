import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Student, StudentDocument } from './schemas/student.schema';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  // Ambil semua siswa
  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  // Ambil 1 siswa
  async findOne(nis: string): Promise<Student> {
    const student = await this.studentModel.findOne({ nis }).exec();
    if (!student) throw new Error('Siswa tidak ditemukan');
    return student;
  }

  // ================= LOGIN SISWA =================
  async login(nis: string, password: string): Promise<Omit<Student, 'password'> | null> {
    const studentDoc = await this.studentModel.findOne({ nis }).exec();
    if (!studentDoc) return null;

    // CAST via unknown supaya TS tidak complain
    const student = (studentDoc.toObject() as unknown) as Student & { password: string };

    const match = await bcrypt.compare(password, student.password);
    if (!match) return null;

    const { password: pwd, ...result } = student;
    return result;
  }

  // ================= KEHADIRAN =================
  async createAttendance(nis: string, body: CreateAttendanceDto): Promise<Student> {
    const student = await this.studentModel.findOne({ nis }).exec();
    if (!student) throw new Error('Siswa tidak ditemukan');

    const timestamp = body.timestamp ? new Date(body.timestamp) : new Date();

    if (!student.attendanceHistory) student.attendanceHistory = [];
    student.attendanceHistory.push({ status: body.status || 'Hadir', timestamp });

    student.status = body.status || 'Hadir';

    return student.save();
  }

  // Alias supaya service lain bisa panggil
  async markAttendance(nis: string, body: CreateAttendanceDto): Promise<Student> {
    return this.createAttendance(nis, body);
  }

  // RESET semua kehadiran
  async resetAllAttendanceByGuru(): Promise<Student[]> {
    await this.studentModel.updateMany(
      {},
      { $set: { status: 'Belum Absen', attendanceHistory: [] } }
    );
    return this.findAll();
  }

  // RESET 1 siswa
  async resetOneAttendance(nis: string): Promise<Student> {
    const student = await this.studentModel.findOne({ nis }).exec();
    if (!student) throw new Error('Siswa tidak ditemukan');

    student.status = 'Belum Absen';
    student.attendanceHistory = [];
    return student.save();
  }
}
