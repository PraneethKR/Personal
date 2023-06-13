import { Component, OnInit } from '@angular/core';
import { UserWorkoutsService } from '../user-workouts.service';
import { Router } from '@angular/router';
import { Subject, pipe, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  private _unsubscribeAll: Subject<any>
  constructor(private workoutService: UserWorkoutsService, private _route: Router){
    this._unsubscribeAll = new Subject<any>()
  }
  workouts = []
  user: any;

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.workoutService.getPreLoadedWorkouts({"id": this.user._id}).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.workouts = data
    })
  }

  create(type: any,name:any){
    this._route.navigate(['/workout/complete-create'], {queryParams: {workoutType: type, WorkoutName: name} })
  }
}
