import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {ForsignupService} from '../forsignup.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email;
    password1;
    formdata;
  constructor(private router: Router,private singupService:ForsignupService,private http:HttpClient){

  }
user1;
  ngOnInit() {

    this.formdata=new FormGroup({
      email:new FormControl("",Validators.compose([
        Validators.required
      ])),
      password1:new FormControl("",Validators.compose([
        Validators.required
      ]))
    });
  }
  public onClicklogin(){
  //this.nn="hiii";
  //alert(x);
  this.router.navigateByUrl('/signup');
  //window.open('/restaurants');
}

onClickSubmit(){
      this.singupService.verifyUser(JSON.stringify(this.formdata.value)).subscribe(
        data=>{console.log(data); this.router.navigateByUrl('/homepage');},
        error=>console.error(error)
      )
  //  alert(data.password);

}

  viewPassword(){
    var x=document.getElementById("password-field");
    if(x.getAttribute("type")=="password")
    {
      x.setAttribute("type","text");
    }
    else
    {
      x.setAttribute("type","password");
    }
  }
}
