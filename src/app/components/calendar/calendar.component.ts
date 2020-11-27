import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import flatpickr from 'flatpickr';
import { PlannerService } from 'src/app/services/planner.service';
import { EventObj } from '../../models/EventObj';
import { CalendarNote } from 'src/app/models/CalendarNote';

flatpickr.l10ns.default.firstDayOfWeek = 1;

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  @ViewChild('noteView', { static: true }) noteView: TemplateRef<any>;

  @ViewChild('eventView', { static: true }) eventView: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.clickedEdit = true;
        this.oldEvent.calendarEvent = { ...event };
        this.tempEvent.calendarEvent = event;
      },
    },
    {
      label: '<i class="fas fa-fw fa-clipboard"></i>',
      a11yLabel: 'Note',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.events = this.events.filter((iEvent) => iEvent !== event);
        // if (event == this.tempEvent) this.tempEvent = null
        this.noteEvent('Note', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  tempEvent: EventObj;

  oldEvent: EventObj;

  clickedEdit = false;

  events: EventObj[];

  mapedEvents: CalendarEvent[];

  activeDayIsOpen = true;

  private xd: CalendarEvent;

  note: string;

  constructor(
    private modal: NgbModal,
    private plannerService: PlannerService
  ) {}

  ngOnInit(): void {
    this.plannerService.getEvents().subscribe((data) => {
      console.log(data);
      this.events = data;
      if (this.events) {
        // tslint:disable-next-line:prefer-const
        for (let item of Object.keys(this.events)) {
          // tslint:disable-next-line:prefer-const
          let eventItem = this.events[item];
          console.log(eventItem);
          // this.mapedEvents.push(eventItem.calendarEvent);
        }
      }
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.tempEvent = null;
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.tempEvent = null;
    this.mapedEvents = this.mapedEvents.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    // this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  noteEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.noteView, { size: 'lg' });
  }

  showEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.eventView, { size: 'lg' });
  }

  addEvent(): void {
    if (this.clickedEdit === false) {
      this.mapedEvents.push(this.tempEvent.calendarEvent);
    }
    this.plannerService.saveEvent(this.tempEvent);

    this.tempEvent = null;
    this.clickedEdit = false;

    this.plannerService.getEvents();
  }

  createNewEvent(): void {
    this.clickedEdit = false;
    this.xd = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    };
    this.tempEvent = {
      id: 1,
      calendarEvent: this.xd,
      userID: 1,
    };
  }

  cancelEdit(): void {
    this.tempEvent = Object.assign(this.tempEvent, this.oldEvent);
    this.tempEvent = null;
    this.refresh.next();
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter(
      (event) => event.calendarEvent !== eventToDelete
    );
    this.tempEvent = null;
    this.clickedEdit = false;
  }

  saveNote(event: any): void {
    const calendarNote = new CalendarNote();
    calendarNote.eventId = event.id;
    calendarNote.note = this.note;

    this.plannerService.saveNote(calendarNote);
    console.log('save note');
  }
}
