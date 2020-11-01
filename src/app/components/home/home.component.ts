import { Component, OnInit } from '@angular/core';
import { __classPrivateFieldGet } from 'tslib';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  private url = "http://localhost:8080/user/";
  user : any;
  constructor(private httpClient: HttpClient) {
    
   }

   public sendGetRequest(){
    return this.httpClient.get(this.url).subscribe((data=> {
      this.user = data;
      console.log(this.user);
    }));
  };
  ngOnInit(): void {
      this.sendGetRequest()
        
    }
  
  }
  
  




