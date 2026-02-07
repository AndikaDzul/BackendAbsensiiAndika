import { Controller, Post, Body } from '@nestjs/common'
import { TeachersService } from './teachers.service'

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  createTeacher(@Body() body: any) {
    return this.teachersService.create(body)
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.teachersService.login(body.email, body.password)
  }
}