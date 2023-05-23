import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailVerificationService } from './email-verification.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent {

  private _unsubscribeAll: Subject<any>

  token = ""
  inprogress = false;
  failed = false;
  constructor(private _router: Router, private route: ActivatedRoute,private emailService: EmailVerificationService){
    this._unsubscribeAll = new Subject<any>()
  }

  ngOnInit(){
    this.failed = false;
    this.inprogress = true
    this.token = this.route.snapshot.params["id"]
    this.emailService.verify({
      "token": this.token
    }).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data:any)=>{
      this.inprogress = false;
      this.failed = false;
      this._router.navigate([''])
    },
    err=>{
      this.inprogress = false;
      this.failed = true
    })
  }
}
