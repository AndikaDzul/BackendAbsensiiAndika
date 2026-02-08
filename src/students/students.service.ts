import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Student, StudentDocument, AttendanceHistory } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-students.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().sort({ createdAt: -1 }).select('-password');
  }

  async createStudent(dto: CreateStudentDto): Promise<Student> {
    if (!dto.nis || !dto.password)
      throw new BadRequestException('NIS dan password wajib diisi');

    const existing = await this.studentModel.findOne({ nis: dto.nis });
    if (existing) throw new ConflictException('NIS sudah terdaftar');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const student = new this.studentModel({
      nis: dto.nis,
      password: hashedPassword,
      name: dto.name,
      class: dto.class || '',
      email: dto.email || null,
      status: '',
      attendanceHistory: [],
    });

    return student.save();
  }

  async loginStudent(dto: LoginStudentDto) {
    const student = await this.studentModel.findOne({ nis: dto.nis });
    if (!student) throw new NotFoundException('Siswa tidak ditemukan');

    const match = await bcrypt.compare(dto.password, student.password);
    if (!match) throw new UnauthorizedException('Password salah');

    const { password, ...result } = student.toObject();
    return {
      message: 'Login berhasil',
      student: result,
    };
  }

  async deleteStudent(nis: string) {
    const result = await this.studentModel.deleteOne({ nis });
    if (result.deletedCount === 0)
      throw new NotFoundException('Siswa tidak ditemukan');
    return { ok: true };
  }

  async markAttendance(nis: string, dto: CreateAttendanceDto) {
    const student = await this.studentModel.findOne({ nis });
    if (!student) throw new NotFoundException('Siswa tidak ditemukan');

    const now = new Date();
    
    // PERBAIKAN: Gunakan type casting (dto as any) agar TS tidak komplain 
    // jika qrToken tidak terbaca di DTO.
    const inputData = dto as any;

    const attendance: any = {
      day: now.toLocaleDateString('id-ID', { weekday: 'long' }),
      date: now,
      status: inputData.status,
      method: inputData.method || 'system',
      timestamp: now,
      qrToken: inputData.qrToken || inputData.teacherToken, // Menampung qrToken dari frontend
      teacherToken: inputData.teacherToken,
      mapel: inputData.mapel,
      guru: inputData.guru,
      jam: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    student.attendanceHistory.push(attendance);
    student.status = inputData.status;

    return student.save();
  }

  async resetStudentAttendance(nis: string) {
    const student = await this.studentModel.findOneAndUpdate(
      { nis },
      { status: '', attendanceHistory: [] },
      { new: true },
    );

    if (!student) throw new NotFoundException('Siswa tidak ditemukan');
    return { ok: true };
  }

  async resetAllAttendanceByGuru() {
    await this.studentModel.updateMany({}, { status: '', attendanceHistory: [] });
    return { ok: true };
  }
}