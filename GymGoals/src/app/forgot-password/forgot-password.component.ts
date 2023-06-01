import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Subject, takeUntil } from 'rxjs';
import { ForgotPasswordService } from './forgot-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  private _unsubscribeAll: Subject<any>
  resetForm: FormGroup;
  verifyForm: FormGroup;
  forgotPassword: FormGroup
  loginError = false;
  loginError2 = false;
  loginError1 = false;
  submitted = false;
  submitted2 = false;
  submitted1 = false;
  userData: any;
  
  constructor(private _formBuilder: FormBuilder,private _forgotPassword: ForgotPasswordService, private _router: Router){
    this._unsubscribeAll = new Subject<any>()
  }

  ngOnInit() {
    this.resetForm = this._formBuilder.group({
      id: ['', [Validators.required, Validators.email]]
    });
  }

  resetPassword(){
    this.submitted = true;
    this.loginError = false;
    this._forgotPassword.sendCode(this.resetForm.value).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.userData = data;
      this.submitted = false;
      this.verifyCode();
    },
    ((err) => {
      this.loginError = true;
    }))
  }

  verifyCode(){
    this.submitted1 = true;
    console.log(this.userData)
    this.verifyForm = this._formBuilder.group({
      id: [this.userData.ID, Validators.required],
      code: [null,[Validators.required, Validators.max(999999), Validators.min(100000)]]
    })
  }

  verifyPassword(){
    this.submitted1 = false;
    this.loginError1 = false;
    this._forgotPassword.sendVerifyCode(this.verifyForm.value).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this.submitted1 = true;
      this.submitted = true;
      this.reset()
    },
    ((err) => {
      this.submitted1 = true
      this.loginError1 = true;
    }))
  }

  reset(){
    this.submitted2 = true
    this.submitted1 = false;
    this.forgotPassword = this._formBuilder.group({
      code: [this.verifyForm.controls['code'].value,Validators.required],
      id: [this.userData.ID,Validators.required],
      password: ["",[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
      confirmPassword: ["", Validators.required]
    })
  }

  forgot(){
    this._forgotPassword.forgot(this.forgotPassword.value).pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      this._router.navigate(['/login'])
    },
    ((err) => {
      this.loginError2 = true;
    }))
  }
}
