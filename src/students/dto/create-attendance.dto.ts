import { IsString, IsOptional } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  qrToken: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  timestamp?: string; // 🔹 timestamp opsional
}
