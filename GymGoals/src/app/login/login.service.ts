import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs'
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
  private loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);
  constructor(private http: HttpClient) { }

  login(userData: any) {
    return this.http
        .post('http://localhost:8080/user/signIn', userData, httpOptions)
        .pipe(
            map((data: any) => {
              localStorage.setItem ('token', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              this.loggedIn.next(true)
                return data
            })
        )
  }

  logout(){
    console.log(this.loggedIn)
    this.loggedIn.next(false)
    return;
  }

  loginStatusChange(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
