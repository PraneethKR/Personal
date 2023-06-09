import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component'

const routes: Routes = [
  {
      path: '',
      component: LandingPageComponent,
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LandingPageModule { }
