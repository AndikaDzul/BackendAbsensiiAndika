import { IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateAttendanceDto {
  @IsOptional()
  @IsString()
  status?: string; // Hadir / Sakit / Izin / dll

  @IsOptional()
  @IsDateString()
  timestamp?: string; // ISO date
}
