import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  qrToken?: string; // WAJIB ADA AGAR POSTMAN TIDAK ERROR 400

  @IsString()
  @IsOptional()
  timestamp?: string; // WAJIB ADA AGAR POSTMAN TIDAK ERROR 400

  @IsString()
  @IsOptional()
  method?: string;

  @IsString()
  @IsOptional()
  teacherToken?: string;

  @IsString()
  @IsOptional()
  mapel?: string;

  @IsString()
  @IsOptional()
  guru?: string;
}