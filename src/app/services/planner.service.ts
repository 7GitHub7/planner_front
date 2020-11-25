import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {EventObj} from '../models/EventObj';
import {CalendarNote} from '../models/CalendarNote';

@Injectable({
  providedIn: 'root',
})


export class PlannerService {
  private url = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {
  }

  public getEvents() {
    return this.httpClient.get<EventObj[]>(this.url + 'events');
  }

  public getSpecifiedEvent(id: number) {
    return this.httpClient.get<EventObj>(this.url + 'event/' + id);
  }

  public saveEvent(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.post(this.url + 'event', body, httpOptions).subscribe((data) => {
      console.log(data);
    });
  }

  public saveNote(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.post(this.url + 'note', body, httpOptions).subscribe((data) => {
      console.log(data);
    });
  }

  public getNoteForEvent(eventId: number) {
    return this.httpClient.get<CalendarNote>(this.url + 'notes/' + eventId);
  }


}
