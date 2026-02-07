import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { StudentsModule } from './students/students.module';
import { AttendanceModule } from './attendance/attendance.module';
import { TeachersModule } from './teachers/teachers.module';
import { AdminsModule } from './admins/admins.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ConfigModule } from './config/config.module'; // GPS Config Module

@Module({
  imports: [
    NestConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/absensi',
    ),
    StudentsModule,
    AttendanceModule,
    TeachersModule,
    AdminsModule,
    SchedulesModule,
    ConfigModule,
  ],
})
export class AppModule {}
