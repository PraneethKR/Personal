import { Injectable, inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService {

  // Initialization

  constructor(
    private router: Router
  ) { }

  // Methods

  canActivate(): boolean {

    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}