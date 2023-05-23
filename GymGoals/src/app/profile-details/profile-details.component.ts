import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) {

  }

  changeUsernameForm: FormGroup
  changeWeightForm: FormGroup
  changeBodyFatForm: FormGroup
  changeSkeletalMuscleForm: FormGroup
  changePasswordForm: FormGroup
  weight = 40
  skeletalMuscle = 70
  bodyFat = 29

  ngOnInit(){
    this.changeUsernameForm = this._formBuilder.group({
      userName: ["", Validators.required]
    })
    this.changeWeightForm = this._formBuilder.group({
      weight: [,Validators.required]
    })
    this.changeBodyFatForm = this._formBuilder.group({
      bodyFat: [,Validators.required]
    })
    this.changeSkeletalMuscleForm = this._formBuilder.group({
      skeletalMuscle: [,Validators.required]
    })
    this.changePasswordForm = this._formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["",[Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}")]],
      confirmPassword: ["", Validators.required]
    })
  }

  changeUserName(){
    console.log(this.changeUsernameForm)
  }

  open(){
    console.log(this.weight)
  }
}
