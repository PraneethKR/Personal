import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileDetailsService } from './profile-details.service';
import { Subject, take, takeUntil } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>
  
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private _profileService: ProfileDetailsService,private _user:LoginService, private _route: Router) {
    this._unsubscribeAll = new Subject<any>()
  }
  profileData: any;
  dataAvailable = false;
  token = "";
  changeUsernameForm: FormGroup
  changeWeightForm: FormGroup
  changeBodyFatForm: FormGroup
  changeSkeletalMuscleForm: FormGroup
  changePasswordForm: FormGroup
  weight = 0
  skeletalMuscle = 0
  bodyFat = 0
  weightTarget = 0
  skeletalMuscleTarget = 0
  bodyFatTarget = 0
  workouts: any;
  

  ngOnInit(){
    this.token = this.route.snapshot.params["id"]
    this._profileService.getProfile({"id": this.token}).pipe(takeUntil(this._unsubscribeAll)).subscribe((userData)=>{
      this.profileData = userData.profile
      this.skeletalMuscle = this.profileData.skeletalMuscleTarget
      this.weight = this.profileData.weightTarget
      this.bodyFat = this.profileData.bodyFatTarget
      this.calc()
      this.dataAvailable = true;
    })
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
      id: [this.token, Validators.required],
      oldPassword: ["", Validators.required],
      newPassword: ["",[Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}")]],
      confirmPassword: ["", Validators.required]
    })
    this._profileService.getAllWorkoutPlan({"id": this.token}).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      var today = new Date();
      var todayWeekday = today.getDay(); 
      this.workouts = data
    });
  }

  changeUserName(){
    this._profileService.updateUsername({"id": this.token, "username":  this.changeUsernameForm.controls['userName'].value}).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.profileData.username = this.changeUsernameForm.controls['userName'].value
      this.changeUsernameForm.reset()
    })
  }

  changeWeight(){
    this._profileService.updateWeight({"id": this.token, "weight":  this.changeWeightForm.controls['weight'].value}).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.profileData.weight[this.profileData.weight.length] = this.changeWeightForm.controls['weight'].value
      this.calc()
      this.changeWeightForm.reset()
    })
  }

  changeBodyFat(){
    this._profileService.updateBodyFat({"id": this.token, "bodyFat":  this.changeBodyFatForm.controls['bodyFat'].value}).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.profileData.bodyFat[this.profileData.bodyFat.length] = this.changeBodyFatForm.controls['bodyFat'].value
      this.calc()
      this.changeBodyFatForm.reset()
    })
  }

  changeSkeletalMuscle(){
    this._profileService.updateSkeletalMuscle({"id": this.token, "skeletalMuscle":  this.changeSkeletalMuscleForm.controls['skeletalMuscle'].value}).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.profileData.skeletalMuscle[this.profileData.skeletalMuscle.length] = this.changeSkeletalMuscleForm.controls['skeletalMuscle'].value
      this.calc()
      this.changeSkeletalMuscleForm.reset()
    })
  }

  changeWeightTarget(){
    this._profileService.updateWeightTarget({"id": this.token, "weight": this.weight}).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.calc()
    })
  }

  changeBodyFatTarget(){
    this._profileService.updateBodyFatTarget({"id": this.token, "bodyFat":this.bodyFat}).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.calc()
    })
  }

  changeSkeletalMuscleTarget(){
    this._profileService.updateSkeletalMuscleTarget({"id": this.token, "skeletalMuscle": this.skeletalMuscle}).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.calc()
    })
  }

  deleteProfile(){
    if(confirm("Are you sure you want to delete your profile")){
      this._profileService.deleteProfile({"id": this.token}).pipe(takeUntil(this._unsubscribeAll)).subscribe((userData)=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this._user.logout()
        this._route.navigate([''])
        console.log(this.profileData)
      })
    }
  }

  updatePassword(){
    this._profileService.updatePassword(this.changePasswordForm.value).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.ngOnInit();
    })
  }

  calc(){
    if(this.weight < this.profileData.weight[this.profileData.weight.length - 1]){
      this.weightTarget = (this.weight/this.profileData.weight[this.profileData.weight.length - 1])*100
    }else if(this.weight > this.profileData.weight[this.profileData.weight.length - 1]){
      this.weightTarget = (this.profileData.weight[this.profileData.weight.length - 1]/this.weight)*100
    }else{
      this.weightTarget = 100
    }
    if(this.bodyFat < this.profileData.bodyFat[this.profileData.bodyFat.length - 1]){
      this.bodyFatTarget = (this.bodyFat/this.profileData.bodyFat[this.profileData.bodyFat.length - 1])*100
    }else if(this.bodyFat > this.profileData.bodyFat[this.profileData.bodyFat.length - 1]){
      this.bodyFatTarget = (this.profileData.bodyFat[this.profileData.bodyFat.length - 1]/this.bodyFat)*100
    }else{
      this.bodyFatTarget = 100
    }
    if(this.skeletalMuscle < this.profileData.skeletalMuscle[this.profileData.skeletalMuscle.length - 1]){
      this.skeletalMuscleTarget = (this.skeletalMuscle/this.profileData.skeletalMuscle[this.profileData.skeletalMuscle.length - 1])*100
    }else if(this.skeletalMuscle > this.profileData.skeletalMuscle[this.profileData.skeletalMuscle.length - 1]){
      this.skeletalMuscleTarget = (this.profileData.skeletalMuscle[this.profileData.skeletalMuscle.length - 1]/this.skeletalMuscle)*100
    }else{
      this.skeletalMuscleTarget = 100
    }
  }
}
