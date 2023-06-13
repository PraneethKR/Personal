import { Component, NgModule, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserWorkoutsComponent } from './user-workouts.component';
import { CreateComponent } from './create/create.component';
import { GuardAuthService } from '../guard-auth.service';
import { MainPageComponent } from './main-page/main-page.component';
import { CompleteCreateComponent } from './complete-create/complete-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'

const routes: Routes = [

  {
      path: '',
      component: UserWorkoutsComponent,
      children: [
        {
          path: 'main-page',
          component: MainPageComponent,
          pathMatch: 'full'
        },
        {
          path: 'create',
          component: CreateComponent
        },
        {
          path:'complete-create',
          component: CompleteCreateComponent
        }
      ]
  }
]

@NgModule({
  declarations: [
    CreateComponent,
    MainPageComponent,
    CompleteCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class UserWorkoutsModule { }
