import { Component, OnInit } from '@angular/core';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private plannerService: PlannerService) {}

  ngOnInit(): void {
  }
}
