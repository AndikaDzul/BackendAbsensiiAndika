import { Controller, Get, Post, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { StudentsService } from './students.service';

interface AttendanceDto {
  day: string;
  date: string | Date;
  status: string;
  method: string;
  timestamp: string | Date;
  teacherToken?: string;
  mapel?: string;
  guru?: string;  
  jam?: string;
}

interface LoginDto {
  email: string;
  password: string;
}

@Controller('students')
export class StudentsController {
  constructor(private readonly service: StudentsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ================= REPORT ADMIN =================
  @Get('report/:day')
  getDailyReport(@Param('day') day: string) {
    return this.service.getDailyReport(day);
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Delete(':nis')
  remove(@Param('nis') nis: string) {
    return this.service.remove(nis);
  }

  @Post('reset')
  resetAllAttendance() {
    return this.service.resetAllAttendance();
  }

  // ================= ABSEN SISWA =================
 @Post('mark/:nis')
async markAttendance(
  @Param('nis') nis: string,
  @Body() attendance: AttendanceDto
) {
  return this.service.markAttendance(nis, {
    ...attendance,
    date: new Date(attendance.date),
    timestamp: new Date(attendance.timestamp),
  });
}


  // ================= LOGIN SISWA =================
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.service.login(body.email, body.password);
  }
}
