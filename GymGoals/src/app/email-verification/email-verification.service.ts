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
export class EmailVerificationService {

  constructor(private http: HttpClient) { }

  verify(id:any){
    return this.http
        .post('http://localhost:8080/user/verify', id, httpOptions)
        .pipe(
            map((data: any) => {
                console.log(data)
                return data
            })
        )
  }
}
