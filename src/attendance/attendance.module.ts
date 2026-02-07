import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { StudentsModule } from '../students/students.module';
import { SchedulesModule } from '../schedules/schedules.module';

@Module({
  imports: [StudentsModule, SchedulesModule], // Harus import module yang menyediakan service
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
