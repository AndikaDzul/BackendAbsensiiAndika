import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// Modules
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { AdminsModule } from './admins/admins.module';
import { AttendanceModule } from './attendance/attendance.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/absensi'),

    StudentsModule,
    TeachersModule,
    AdminsModule,
    AttendanceModule,
    SchedulesModule,
  ],
})
export class AppModule {}
