import { Injectable } from '@nestjs/common';
import { StudentsService } from '../students/students.service';
import { SchedulesService } from '../schedules/schedules.service';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly schedulesService: SchedulesService
  ) {}

  async markAttendance(nis: string, qrToken: string) {
    const student = await this.studentsService.findOne(nis);

    const now = new Date();
    const dayNames = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const today = dayNames[now.getDay()];

    const schedules = await this.schedulesService.getScheduleForClass(student.class, today);

    if (!schedules || schedules.length === 0) {
      return this.studentsService.markAttendance(nis, {
        day: today,
        date: now,
        status: 'Hadir',
        method: 'QR',
        timestamp: now,
        teacherToken: qrToken
      });
    }

    for (const s of schedules) {
      const exist = student.attendanceHistory.find(
        a => a.day === today && a.jam === s.jam && a.mapel === s.mapel
      );
      if (!exist) {
        await this.studentsService.markAttendance(nis, {
          day: today,
          date: now,
          status: 'Hadir',
          method: 'QR',
          timestamp: now,
          teacherToken: qrToken,
          mapel: s.mapel,
          guru: s.guru,
          jam: s.jam
        });
      }
    }

    student.status = 'Hadir';
    return student.save();
  }

  async resetAttendance() {
    return this.studentsService.resetAllAttendance();
  }
}
