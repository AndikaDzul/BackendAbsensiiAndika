import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { Schedule } from './schedule.schema';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}

  @Post()
  async create(@Body() schedule: Partial<Schedule>) {
    return this.service.create(schedule);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get('day/:day')
  async findByDay(@Param('day') day: string) {
    return this.service.findByDay(day); // Sekarang tidak error
  }

  @Get('class/:kelas/day/:day')
  async getScheduleForClass(@Param('kelas') kelas: string, @Param('day') day: string) {
    return this.service.getScheduleForClass(kelas, day);
  }
}
