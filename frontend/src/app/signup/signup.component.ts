import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {ForsignupService} from '../forsignup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    username;
    password1;
    password2;
    formdata;
    email;
    pswerror:string="";
    constructor(private router: Router,private singupService:ForsignupService) { }

  ngOnInit() {
    this.formdata=new FormGroup({
    username:new FormControl("",Validators.compose([Validators.required])),
    email:new FormControl("",Validators.compose([
      Validators.required, Validators.pattern("^[^@\s]+@[^@\s]+\.[^@\s]+$")
    ])),
    password1:new FormControl("",Validators.compose([
      Validators.required,Validators.minLength(4)
    ])),
    password2:new FormControl("",Validators.compose([
      Validators.required
    ]))
  });
  }

  onClickSubmit(user){
   if(user.password1==user.password2)
   {
    this.singupService.registerUser(user);
    this.router.navigateByUrl('/login');
   }
   else
   {
      this.pswerror="passwords dont match";
      this.router.navigateByUrl('/signup');
   }
  }
}
