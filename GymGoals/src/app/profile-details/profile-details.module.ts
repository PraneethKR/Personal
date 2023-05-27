import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailsComponent } from './profile-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuardAuthService } from '../guard-auth.service';


const routes: Routes = [
  {
      path: '',
      component: ProfileDetailsComponent,
      canActivate: [GuardAuthService]
  },
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileDetailsModule { }
