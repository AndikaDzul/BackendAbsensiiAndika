import { Injectable } from '@nestjs/common';
import { StudentsService } from '../students/students.service';
import { CreateAttendanceDto } from '../students/dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly studentsService: StudentsService) {}

  async markAttendance(nis: string, body: CreateAttendanceDto) {
    return this.studentsService.markAttendance(nis, body);
  }

  async resetAllAttendance() {
    return this.studentsService.resetAllAttendanceByGuru();

  }
}
