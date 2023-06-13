import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserWorkoutsService } from '../user-workouts.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-complete-create',
  templateUrl: './complete-create.component.html',
  styleUrls: ['./complete-create.component.css']
})
export class CompleteCreateComponent {

  private _unsubscribeAll: Subject<any>
  show = false;
  error = false;
  type: string;
  name: string;
  CreateForm: FormGroup;
  constructor(private _router: Router,private route: ActivatedRoute,private _formBuilder: FormBuilder, private _workoutService: UserWorkoutsService) { this._unsubscribeAll = new Subject<any>()}
  user: any;

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.route.queryParams
    .subscribe((params: any) => {
      this.type = params.workoutType;
      this.name = params.WorkoutName;
      this.show = true;
      this.CreateForm = this._formBuilder.group({
        userid: [this.user._id, Validators.required],
        type: [this.type, Validators.required],
        name: ["", Validators.required],
        weekDay: ["", Validators.required]
      })
    })
  }

  create(){
    this.show = false;
    this._workoutService.createWorkoutPlan(this.CreateForm.value).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this._router.navigate(['/workout/main-page'])
    },(err=>{
      this.show = true;
      this.error = true;
    }))
  }

  clearForm(){
    this.CreateForm = this._formBuilder.group({
      userid: [this.user._id, Validators.required],
      type: [this.type, Validators.required],
      name: ["", Validators.required],
      weekDay: ["", Validators.required]
    })
    this.show = true;
    this.error = false;
  }
}
