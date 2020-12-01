import 'flatpickr/dist/flatpickr.css';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeaderModule } from '../angular-calendar-demos/calendar-header/calendar-header.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, CalendarComponent, NavBarComponent, LoginComponent, RegisterComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CalendarHeaderModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
