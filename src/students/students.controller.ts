// src/students/students.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-students.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getAll() {
    return this.studentsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.createStudent(dto);
  }

  @Post('login')
  login(@Body() dto: LoginStudentDto) {
    return this.studentsService.loginStudent(dto);
  }

  @Delete(':nis')
  delete(@Param('nis') nis: string) {
    return this.studentsService.deleteStudent(nis);
  }

  // Endpoint yang digunakan Postman/Vue: POST /api/students/attendance/:nis
  @Post('attendance/:nis')
  markAttendance(@Param('nis') nis: string, @Body() body: CreateAttendanceDto) {
    return this.studentsService.markAttendance(nis, body);
  }

  @Post('reset/:nis')
  resetOne(@Param('nis') nis: string) {
    return this.studentsService.resetStudentAttendance(nis);
  }

  @Post('reset')
  resetAttendance() {
    return this.studentsService.resetAllAttendanceByGuru();
  }
}