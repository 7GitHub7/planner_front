import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private url = 'http://localhost:8080/user/';
  user: any;
  constructor(private httpClient: HttpClient) {}

  public sendGetRequest() {
    return this.httpClient.get(this.url).subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
  }
}
