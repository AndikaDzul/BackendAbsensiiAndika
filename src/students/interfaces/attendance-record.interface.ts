export interface AttendanceRecord {
  day: string            // Sabtu
  date: string           // 2026-02-07
  time: string           // 17:39:15
  status: string         // Hadir
  method: 'qr' | 'manual'
  photo?: string
  createdAt: Date
  updatedAt: Date
}
