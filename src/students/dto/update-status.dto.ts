// src/students/dto/update-status.dto.ts
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateStatusDto {
  @IsNotEmpty({ message: 'Status wajib diisi' })
  @IsString()
  status: string
}
