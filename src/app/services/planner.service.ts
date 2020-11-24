import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private url = 'http://localhost:8080/user/';
  user: any;
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest() {
    return this.httpClient.get(this.url).subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
  }

  public sendPostRequest(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    return this.httpClient.post("http://localhost:8080/event", body, httpOptions).subscribe((data) => {
      console.log(data);
    });
  }
}
