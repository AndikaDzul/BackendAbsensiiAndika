import { IsString, IsOptional } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  status: string; // "Hadir"
  
  @IsString()
  method: string; // "QR" / "manual"

  @IsOptional()
  @IsString()
  photo?: string;
}
