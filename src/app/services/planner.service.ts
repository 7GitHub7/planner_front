import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { EventObj } from '../models/EventObj';
import { CalendarNote } from '../models/CalendarNote';
import { CalendarEvent } from 'angular-calendar';
import { User } from '../models/User';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private url = 'http://localhost:8080/';

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  public getEvents() {
    return this.httpClient.get<EventObj[]>(
      this.url + this.localStorage.getUserIdFromLocalStorage() + '/events'
    );
  }

  public getSpecifiedEvent(id: number) {
    return this.httpClient.get<EventObj>(this.url + this.localStorage.getUserIdFromLocalStorage() + '/event/' + id);
  }

  public saveEvent(body: EventObj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(this.url + this.localStorage.getUserIdFromLocalStorage() + '/event', body, httpOptions);
  }

  public updateEvent(body: EventObj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.put(
      this.url + this.localStorage.getUserIdFromLocalStorage() + '/event/' + body.calendarEvent.id,
      body,
      httpOptions
    );
  }

  public deleteEvent(event: CalendarEvent) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.delete(this.url + this.localStorage.getUserIdFromLocalStorage() + '/event/' + event.id, httpOptions);
  }

  public saveNote(body: CalendarNote, eventId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      this.url + this.localStorage.getUserIdFromLocalStorage() + '/note/' + eventId,
      body,
      httpOptions
    );
  }

  public deleteNote(noteId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.delete(this.url + this.localStorage.getUserIdFromLocalStorage() + '/note/' + noteId, httpOptions);
  }

  public updateNote(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.put(this.url + this.localStorage.getUserIdFromLocalStorage() + '/note/' + body.id, body, httpOptions);
  }

  public getNoteForEvent(eventId: number) {
    return this.httpClient.get<CalendarNote[]>(this.url + this.localStorage.getUserIdFromLocalStorage() + '/notes/' + eventId);
  }

  public registerUser(body: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(this.url + 'register', body, httpOptions);
  }

  public loginUser(body: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(this.url + 'login', body, httpOptions);
  }

  public logoutUser(userId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(this.url + 'logout/' + userId, httpOptions);
  }

  public getUserById(userId: number) {
    return this.httpClient.get<User>(this.url + 'user/' + userId);
  }

  public isUserLogged(userId: number) {
    let isLogged;
    this.getUserById(userId).subscribe((u) => {
      if (u.logged) {
        isLogged = true;
      } else {
        isLogged = false;
      }
    });
    return isLogged;
  }

  public addTermEvents(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(this.url + '/' + this.localStorage.getUserIdFromLocalStorage() + '/getTermEvents', httpOptions);
  }

  public deleteTermEvents(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.delete(this.url + '/' + this.localStorage.getUserIdFromLocalStorage() + '/deleteTermEvents');
  }
}
