import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmailVerificationComponent } from './email-verification.component';

const routes: Routes = [
  {
      path: '',
      component: EmailVerificationComponent,
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EmailVerificationModule { }
