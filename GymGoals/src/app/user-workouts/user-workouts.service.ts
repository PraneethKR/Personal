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

export class UserWorkoutsService {

  constructor(private http: HttpClient) { }

  getPreLoadedWorkouts(data: any) {
    return this.http
        .post('http://localhost:8080/workout/getPreloadedWorkouts', data, httpOptions)
        .pipe(
            map((data: any) => {
                console.log(data)
                return data
            })
        )
  }

  createWorkoutPlan(data:any){
    return this.http.post('http://localhost:8080/workout/createWorkoutPlan', data, httpOptions)
    .pipe(
      map((data)=>{
        return data;
      })
    )
  }

  getAllWorkoutPlan(data:any){
    return this.http.post('http://localhost:8080/workout/getWorkoutPlan', data, httpOptions)
    .pipe(
      map((data)=>{
        return data;
      })
    )
  }
}
