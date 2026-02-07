import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { Schedule, ScheduleSchema } from './schedule.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }])],
  providers: [SchedulesService],
  controllers: [SchedulesController],
  exports: [SchedulesService] // Penting untuk inject ke AttendanceService
})
export class SchedulesModule {}
