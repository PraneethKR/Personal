import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { LoginService } from './login.service';
import { Subject, takeUntil } from 'rxjs';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('forgetPasswordDialog', { static: true }) forgetPasswordDialog: TemplateRef<any>
  private _unsubscribeAll: Subject<any>
  loginForm: FormGroup;
  email: string
  submitted = false;
  loginError= false

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private dialog: MatDialog,
    private _router: Router,
  ) {
    this._unsubscribeAll = new Subject<any>()
  }

  login(){
    this.submitted = true
    this._loginService.login(this.loginForm.value).pipe(takeUntil(this._unsubscribeAll)).subscribe((data:any)=>{
      this._router.navigate([''])
    },
    (err=>{
      this.loginError = true;
      this.submitted = false
    }))
  }

  ForgetPassword(){

    this.dialog.open(this.forgetPasswordDialog)
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
    console.log(this.loginForm)
  }
}
