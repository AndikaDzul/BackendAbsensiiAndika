import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':nis')
  findOne(@Param('nis') nis: string) {
    return this.studentsService.findOne(nis);
  }

  @Post('attendance/:nis')
  createAttendance(
    @Param('nis') nis: string,
    @Body() body: CreateAttendanceDto,
  ) {
    return this.studentsService.createAttendance(nis, body);
  }
}
