import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { RegisterService } from './register.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private _unsubscribeAll: Subject<any>
  registerForm: FormGroup
  submitted = false
  registerError = false;
  
  constructor(private _router: Router, private _formBuilder: FormBuilder,private _registerService: RegisterService) {
    this._unsubscribeAll = new Subject<any>()
  }

  ngOnInit(){
    this.registerForm = this._formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
      height: [, Validators.required],
      confirmPassword: ["", Validators.required],
      bodyFat: [, Validators.required],
      weight: [[], Validators.required],
      DOB: ["", Validators.required],
      gender: ["", Validators.required],
      skeletalMuscle: ["", Validators.required],
      verification: ["not verified", Validators.required]
    })
  }

  register(){
    console.log(this.registerForm)
    this.submitted = true
    this._registerService.register(this.registerForm.value).pipe(takeUntil(this._unsubscribeAll)).subscribe((data:any)=>{
      this._router.navigate([''])
    },
    (err=>{
      this.submitted = false
      this.registerError = true
    }))
  }

  clearForm(){
    this.registerForm = this._formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
      confirmPassword: ["", Validators.required],
      height: [, Validators.required],
      bodyFat: [, Validators.required],
      weight: [[], Validators.required],
      DOB: ["", Validators.required],
      gender: ["", Validators.required],
      skeletalMuscle: ["", Validators.required],
      verification: ["not verified", Validators.required]
    })
  }
}
