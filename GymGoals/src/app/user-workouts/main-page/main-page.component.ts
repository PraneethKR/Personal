import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserWorkoutsService } from '../user-workouts.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  workouts: any;
  user: any;
  found = false;
  private _unsubscribeAll: Subject<any>
  constructor(private _route: Router, private _workoutService: UserWorkoutsService){
    this._unsubscribeAll = new Subject<any>()
  }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this._workoutService.getAllWorkoutPlan({"id": this.user._id}).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.workouts = data
      this.found = true;
    });
  }

  create(){
    console.log("clicked")
    this._route.navigate(['/workout/create'])
  }
}
