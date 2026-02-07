import { IsString, IsDateString, IsOptional } from 'class-validator';

export class AttendanceDto {
  @IsString()
  day: string;

  @IsDateString()
  date: string;

  @IsString()
  status: string;

  @IsString()
  method: string;

  @IsDateString()
  timestamp: string;

  @IsOptional()
  @IsString()
  teacherToken?: string;

  @IsOptional()
  @IsString()
  mapel?: string;

  @IsOptional()
  @IsString()
  guru?: string;

  @IsOptional()
  @IsString()
  jam?: string;
}
