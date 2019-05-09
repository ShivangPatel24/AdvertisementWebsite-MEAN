import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import{Router} from '@angular/router';
import { ForsignupService } from '../forsignup.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  message;
  srchterm:String='';
  username:String='';
  myarr:any[];
  constructor(private _user:ForsignupService,private router: Router,private http:HttpClient) {
    this._user.user()
    .subscribe(
      data=>this.addName(data),
      error=>this.router.navigateByUrl('/login')
    )
      
   }
   addName(data){
    this.username = data.name;
  }

 

  ngOnInit() {
    this._user.currentMessage.subscribe(message => this.message = message)
    this.srchterm=this.message

    /*this._user.search(this.srchterm).subscribe(
      data=>this.myarr=data,
      error=>console.log(error)
      )*/

    this._user.getads().subscribe(res=>{
      this.myarr=res;
    })
      $(document).ready(function(){
        $("#toadd").addClass("bg1");
        $(window).scroll(function(){
          if($(this).scrollTop()>250){
            $(".navbar1").css("background","#0cb5cc");
          }
          else{
            $(".navbar1").css("background","transparent");
            $("#nav1").removeClass("bg1");
          }
        })
      })
  
      $(document).ready(function(){
        $(".navbar1 a").on('click', function(event) {
  
  
          if (this.hash !== "") {
  
            event.preventDefault();
  
  
            var hash = this.hash;
  
  
            $('html, body').animate({
              scrollTop: $(hash).offset().top
            }, 900, function(){
  
            });
          }
        });
      })
   
  
    
  }
  public onClickhome(){
    //this.nn="hiii";
    //alert(x);
    this.router.navigateByUrl('/homepage');
    //window.open('/restaurants');
    }

}
