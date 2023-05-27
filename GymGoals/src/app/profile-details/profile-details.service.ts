import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'


const httpOptions = {
  headers: new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json'
  }),
}
@Injectable({
  providedIn: 'root'
})
export class ProfileDetailsService {

  constructor(private http: HttpClient) { }

  getProfile(id: any) {
    return this.http
      .post('http://localhost:8080/profile/getProfile', id, httpOptions)
      .pipe(
        map((data: any) => {
          console.log(data)
          return data
        })
      )
  }

  deleteProfile(id: any) {
    return this.http
      .post('http://localhost:8080/profile/deleteProfile', id, httpOptions)
      .pipe(
        map((data: any) => {
          console.log(data)
          return data
        })
      )
  }

  updateUsername(data: any) {
    return this.http
      .post('http://localhost:8080/profile/updateUsername', data, httpOptions)
      .pipe(
        map((data: any) => {
          console.log(data)
          return data
        })
      )
  }

  updateWeight(data: any) {
    return this.http
      .post('http://localhost:8080/profile/updateWeight', data, httpOptions)
      .pipe(
        map((data: any) => {
          console.log(data)
          return data
        })
      )
  }

  updateBodyFat(data: any) {
    return this.http
      .post('http://localhost:8080/profile/updateBodyFat', data, httpOptions)
      .pipe(
        map((data: any) => {
          console.log(data)
          return data
        })
      )
  }

  updateSkeletalMuscle(data: any) {
    return this.http
      .post('http://localhost:8080/profile/updateSkeletalMuscle', data, httpOptions)
      .pipe(
        map((data: any) => {
          console.log(data)
          return data
        })
      )
  }

  updateWeightTarget(data: any) {
    return this.http
      .post('http://localhost:8080/profile/updateWeightTarget', data, httpOptions)
      .pipe(
        map((data: any) => {
          console.log(data)
          return data
        })
      )
  }

  updateBodyFatTarget(data: any) {
    return this.http
      .post('http://localhost:8080/profile/updateBodyFatTarget', data, httpOptions)
      .pipe(
        map((data: any) => {
          console.log(data)
          return data
        })
      )
  }

  updateSkeletalMuscleTarget(data: any) {
    return this.http
      .post('http://localhost:8080/profile/updateSkeletalMuscleTarget', data, httpOptions)
      .pipe(
        map((data: any) => {
          console.log(data)
          return data
        })
      )
  }
}
