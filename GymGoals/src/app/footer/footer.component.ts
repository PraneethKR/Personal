import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  user: any;

  constructor(private _route: Router, private _login: LoginService){

  }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this._login.loginStatusChange().subscribe(loggedIn =>{
      if(loggedIn === true){
        this.user = JSON.parse(localStorage.getItem('user'))
        if(this.user != null){
          
        }
      }else{
        this.user = null
      }
    })
  }

  profileDetails(){
    this._route.navigate(['/profile-details/', this.user._id])
  }

}
