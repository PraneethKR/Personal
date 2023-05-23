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

export class LoginService {

  constructor(private http: HttpClient) { }

  login(userData: any) {
    return this.http
        .post('http://localhost:8080/user/signIn', userData, httpOptions)
        .pipe(
            map((data: any) => {
              localStorage.setItem ('token', data.token);
              localStorage.setItem('user', data.user);
                return data
            })
        )
}
}
