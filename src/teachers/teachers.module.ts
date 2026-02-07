import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'

import { Teacher, TeacherSchema } from './teacher.schema'
import { TeachersService } from './teachers.service'
import { TeachersController } from './teachers.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'RAHASIA_JWT_MU',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService, MongooseModule],
})
export class TeachersModule {}