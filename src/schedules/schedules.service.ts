import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schedule.schema';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>
  ) {}

  async findAll(): Promise<Schedule[]> {
    return this.scheduleModel.find().sort({ hari: 1, jam: 1 }).exec();
  }

  async create(data: Partial<Schedule>): Promise<Schedule> {
    const { mapel, guru, hari, jam, kelas } = data;
    if (!mapel || !guru || !hari || !jam || !kelas) {
      throw new BadRequestException('Lengkapi semua data jadwal');
    }
    const schedule = new this.scheduleModel({ mapel, guru, hari, jam, kelas });
    return schedule.save();
  }
}
