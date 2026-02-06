import { Controller, Get, Post, Body } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { Schedule } from './schedule.schema';

@Controller('schedules') // PENTING: harus plural supaya sesuai frontend
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  findAll(): Promise<Schedule[]> {
    return this.schedulesService.findAll();
  }

  @Post()
  create(@Body() body: any): Promise<Schedule> {
    return this.schedulesService.create(body);
  }
}
