import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { EventObj } from '../models/EventObj';
import { CalendarNote } from '../models/CalendarNote';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private url = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  public getEvents() {
    return this.httpClient.get<EventObj[]>(this.url + 'events');
  }

  public getSpecifiedEvent(id: number) {
    return this.httpClient.get<EventObj>(this.url + 'event/' + id);
  }

  public saveEvent(body: EventObj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient
      .post(this.url + 'event', body, httpOptions)
      .subscribe((data) => {
        console.log(data);
      });
  }

  public updateEvent(body: EventObj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient
      .put(this.url + 'event/' + body.calendarEvent.id, body, httpOptions)
      .subscribe((data) => {
        console.log(data);
      });
  }

  public deleteEvent(event: CalendarEvent) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient
      .delete(this.url + 'event/' + event.id, httpOptions);
  }

  public saveNote(body: CalendarNote, eventId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient
      .post(this.url + 'note/' + eventId, body, httpOptions)
      .subscribe((data) => {
        console.log(data);
      });
  }

  public deleteNote(noteId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient
      .delete(this.url + 'note/' + noteId, httpOptions);
  }

  public getNoteForEvent(eventId: number) {
    return this.httpClient.get<CalendarNote[]>(this.url + 'notes/' + eventId);
  }
}
