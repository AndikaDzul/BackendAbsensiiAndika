import { Controller, Get, Post, Patch, Body, Param, BadRequestException } from '@nestjs/common'
import { StudentsService } from './students.service'

@Controller('students')
export class StudentsController {
  constructor(private readonly service: StudentsService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Post()
  create(@Body() body) {
    return this.service.create(body)
  }

  @Post('login')
  login(@Body() body) {
    if (!body.email || !body.password)
      throw new BadRequestException('Email & password wajib')
    return this.service.login(body.email, body.password)
  }

  @Patch('attendance/:nis')
  update(@Param('nis') nis: string, @Body() body) {
    return this.service.updateStatus(nis, body.status, body.method)
  }

  @Post('scan')
  scan(@Body() body) {
    return this.service.updateStatus(body.nis, body.status || 'Hadir', 'qr')
  }

  @Get('history/:nis')
  history(@Param('nis') nis: string) {
    return this.service.getAttendance(nis)
  }

  @Patch('reset/:nis')
  resetOne(@Param('nis') nis: string) {
    return this.service.resetTodayAttendance(nis)
  }

  @Patch('reset-all')
  async resetAll() {
    return this.service.resetAllAttendance()
  }

  @Get('report/:day')
  async report(@Param('day') day: string) {
    return this.service.getDailyReport(day)
  }
}
