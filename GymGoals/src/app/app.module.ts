import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDialogModule } from "@angular/material/dialog";
import { RegisterComponent } from './register/register.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { GuardAuthService } from './guard-auth.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { AuthServiceInterceptor } from './auth-service.interceptor';
import { HeadingComponent } from './heading/heading.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
        import('./landing-page/landing-page.module').then(
            (m) => m.LandingPageModule
        ),
  },
  {
    path: 'login',
    loadChildren: () =>
        import('./login/login.module').then(
            (m) => m.LoginModule
        ),
  },
  {
    path: 'register',
    loadChildren: () =>
        import('./register/register.module').then(
            (m) => m.RegisterModule
        ),
  },
  {
    path: 'email-verification/:id',
    loadChildren: () =>
        import('./email-verification/email-verification.module').then(
            (m) => m.EmailVerificationModule
        ),
  },
  {
    path: 'profile-details/:id',
    loadChildren: () =>
        import('./profile-details/profile-details.module').then(
            (m) => m.ProfileDetailsModule
        ),
        canActivate: [GuardAuthService]
  },
  {
    path: 'forgotPassword',
    loadChildren: () =>
        import('./forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
        )
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EmailVerificationComponent,
    LandingPageComponent,
    ProfileDetailsComponent,
    HeadingComponent,
    FooterComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    MatIconModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: false,
  }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthServiceInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
