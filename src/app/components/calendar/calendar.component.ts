import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  endOfDay,
  isSameDay,
  isSameMonth,
  startOfDay,
  parseISO,
} from 'date-fns';
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
import { th } from 'date-fns/locale';

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
        this.oldEvent = { ...event };
        this.tempEvent = event;
        console.log(event)
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

  tempEvent: CalendarEvent;

  oldEvent: CalendarEvent;

  eventObjToSend: EventObj;

  clickedEdit = false;

  events: EventObj[];

  mapedEvents: CalendarEvent[] = [];

  returnedNotes: CalendarNote[] = [];

  activeDayIsOpen = true;

  calendarNote: CalendarNote = new CalendarNote();

  constructor(
    private modal: NgbModal,
    private plannerService: PlannerService
  ) { }

  ngOnInit(): void {
    this.updateEventsList();
  }

  updateEventsList(): void {
    this.plannerService.getEvents().subscribe((data) => {
      console.log(data);
      this.events = data;
      if (this.events) {
        // tslint:disable-next-line:prefer-const
        for (let item of Object.keys(this.events)) {
          // tslint:disable-next-line:prefer-const
          let eventItem = this.events[item];
          eventItem.calendarEvent.start = new Date(
            eventItem.calendarEvent.start
          );
          eventItem.calendarEvent.end = new Date(eventItem.calendarEvent.end);
          eventItem.calendarEvent.actions = this.actions;

          this.mapedEvents.push(eventItem.calendarEvent);
          this.refresh.next();
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
    this.getNotes(event);
    this.modal.open(this.noteView, { size: 'lg' });
  }

  showEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.eventView, { size: 'lg' });
  }

  addEvent(): void {

    this.eventObjToSend = {
      id: 1,
      calendarEvent: this.tempEvent,
      userID: 3,
    };

    if (this.clickedEdit === false) {
      this.mapedEvents.push(this.tempEvent);
      this.plannerService.saveEvent(this.eventObjToSend);
    } else {
      this.plannerService.updateEvent(this.eventObjToSend);
    }

    this.tempEvent = null;
    this.clickedEdit = false;
    this.refresh.next();
  }

  createNewEvent(): void {
    this.clickedEdit = false;
    this.tempEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      actions: this.actions,
    }
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
    this.plannerService.deleteEvent(eventToDelete).subscribe(() => {
      this.updateEventsList();
    });

    this.tempEvent = null;
    this.clickedEdit = false;

  }

  saveNote(event: any): void {
    const calendarNoteToSend = new CalendarNote();

    calendarNoteToSend.eventId = event.id;
    calendarNoteToSend.title = this.calendarNote.title;
    calendarNoteToSend.description = this.calendarNote.description;

    this.plannerService.saveNote(calendarNoteToSend, event.id);
  }

  getNotes(event: any): void {
    this.plannerService.getNoteForEvent(event.id).subscribe((data) => {
      console.log(data);
      this.returnedNotes = data;
    })
  }
}
