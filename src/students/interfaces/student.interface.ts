export interface AttendanceHistory {
  status: string;
  timestamp: string;
  qrToken?: string;
  method?: string;
}

export interface Student {
  id: string;
  nis: string;
  name: string;
  class: string;
  status: string;
  attendanceHistory: AttendanceHistory[];
  updatedAt: string;
}