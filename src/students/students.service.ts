import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  // Ambil 1 siswa berdasarkan NIS
  async findOne(nis: string): Promise<Student> {
    const student = await this.studentModel.findOne({ nis }).exec();
    if (!student) throw new Error('Siswa tidak ditemukan');
    return student;
  }

  // CREATE/UPDATE kehadiran siswa
  async createAttendance(nis: string, body: CreateAttendanceDto): Promise<Student> {
    const student = await this.studentModel.findOne({ nis }).exec();
    if (!student) throw new Error('Siswa tidak ditemukan');

    const timestamp = body.timestamp ? new Date(body.timestamp) : new Date();

    if (!student.attendanceHistory) student.attendanceHistory = [];
    student.attendanceHistory.push({ status: body.status || 'Hadir', timestamp });

    student.status = body.status || 'Hadir';

    return student.save();
  }

  // Alias method untuk markAttendance supaya AttendanceService bisa panggil
  async markAttendance(nis: string, body: CreateAttendanceDto): Promise<Student> {
    return this.createAttendance(nis, body);
  }

  // RESET semua kehadiran siswa (dipanggil guru)
  async resetAllAttendanceByGuru(): Promise<Student[]> {
    await this.studentModel.updateMany(
      {},
      { $set: { status: 'Belum Absen', attendanceHistory: [] } }
    );
    return this.findAll();
  }
}
