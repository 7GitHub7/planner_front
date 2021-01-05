export class CalendarNote {
  id: number;
  title: string;
  description: string;
  date?: Date;
  done?: boolean;
  userId: number;
  eventId: number;
}
