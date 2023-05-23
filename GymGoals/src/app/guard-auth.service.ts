import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate {

  // Initialization

  constructor(
    private router: Router
  ) { }

  // Methods

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.error('no token');
      return false;
    }
  }

  canActivate(): boolean {

    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token')
  }
}