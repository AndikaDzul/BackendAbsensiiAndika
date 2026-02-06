import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { AttendanceService } from './attendance.service'
import { Attendance } from './schemas/attendance.schema'

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // 📷 SCAN QR
  @Post('scan')
  async scan(
    @Body()
    body: {
      nis: string
      name?: string
      status?: string
      time?: string
    },
  ): Promise<Attendance> {
    return this.attendanceService.scan(body)
  }

  // 📜 SEMUA DATA
  @Get()
  async findAll(): Promise<Attendance[]> {
    return this.attendanceService.findAll()
  }

  // 📊 LAPORAN PER HARI
  @Get('report/:day')
  async report(@Param('day') day: string): Promise<Attendance[]> {
    return this.attendanceService.reportByDay(day)
  }

  // ♻️ RESET
  @Post('reset')
  async reset(): Promise<{ success: boolean }> {
    return this.attendanceService.resetAll()
  }
}
