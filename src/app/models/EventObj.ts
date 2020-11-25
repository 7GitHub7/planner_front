import {CalendarEvent} from 'angular-calendar';

export class EventObj {
  id: number;
  calendarEvent: CalendarEvent;
  userID: number;
  noteID?: number[];
}
