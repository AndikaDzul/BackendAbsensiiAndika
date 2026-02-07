import { Controller, Patch, Param, Body, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // Endpoint scan QR siswa untuk absen
  @Patch(':nis')
  async scanAttendance(
    @Param('nis') nis: string,
    @Body('qrToken') qrToken: string,
  ) {
    return this.attendanceService.markAttendance(nis, qrToken);
  }

  // Reset semua absensi
  @Post('reset')
  async resetAttendance() {
    return this.attendanceService.resetAttendance();
  }
}
