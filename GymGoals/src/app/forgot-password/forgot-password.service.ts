import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'


const httpOptions = {
  headers: new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  sendCode(data:any){
    return this.http
        .post('http://localhost:8080/user/send-email-reset-password', data, httpOptions)
        .pipe(
            map((data: any) => {
                return data
            })
        )
  }

  sendVerifyCode(data:any){
    return this.http
        .post('http://localhost:8080/user/verify-send-email-reset-password', data, httpOptions)
        .pipe(
            map((data: any) => {
                return data
            })
        )
  }

  forgot(data:any){
    return this.http
        .post('http://localhost:8080/user/resetPassword', data, httpOptions)
        .pipe(
            map((data: any) => {
                return data
            })
        )
  }
}
