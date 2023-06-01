import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {

  user: any;
  name = "User!";
  constructor(private _route: Router, private _login: LoginService){

  }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user != null){
      this.name = this.user.firstName
    }
    this._login.loginStatusChange().subscribe(loggedIn =>{
      if(loggedIn === true){
        this.user = JSON.parse(localStorage.getItem('user'))
        if(this.user != null){
          this.name = this.user.firstName
        }
      }else{
        this.user = null
        this.name = "User!"
      }
    })
  }

  logout(){
    this._login.logout();
    this.user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this._route.navigate([''])
  }

  profileDetails(){
    this._route.navigate(['/profile-details/', this.user._id])
  }
}