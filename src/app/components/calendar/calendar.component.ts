import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
// import { colors } from '../demo-utils/colors';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Click me',
      start: new Date(),
    },
    {
      title: 'Or click me',
      start: new Date(),
    },
  ];

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  constructor() {}

  ngOnInit(): void {
    console.log('calendar component');
  }
}
