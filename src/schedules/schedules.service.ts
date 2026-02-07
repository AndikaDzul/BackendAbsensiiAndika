import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schedule.schema';

@Injectable()
export class SchedulesService {
  constructor(@InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>) {}

  async create(schedule: Partial<Schedule>): Promise<ScheduleDocument> {
    const s = new this.scheduleModel(schedule);
    return s.save();
  }

  async findAll(): Promise<ScheduleDocument[]> {
    return this.scheduleModel.find().exec();
  }

  async findByDay(day: string): Promise<ScheduleDocument[]> {
    return this.scheduleModel.find({ hari: day }).exec();
  }

  async getScheduleForClass(kelas: string, day: string): Promise<ScheduleDocument[]> {
    return this.scheduleModel.find({ kelas, hari: day }).exec();
  }
}
