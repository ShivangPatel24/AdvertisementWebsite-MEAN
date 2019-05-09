import { Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import{Router} from '@angular/router';
import { ForsignupService } from '../forsignup.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-postad',
  templateUrl: './postad.component.html',
  styleUrls: ['./postad.component.css']
})
export class PostadComponent implements OnInit {
  username:String='';
  message;
  title;
  category;
  addesc;
  price;
  name;
  city;
  public srchterm;
  constructor(private _user:ForsignupService,private router: Router,private http:HttpClient){
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

  newMessage(){
    this._user.changeMessage(this.srchterm)
  }





public onClickhome(){
//this.nn="hiii";
//alert(x);
this.router.navigateByUrl('/homepage');
//window.open('/restaurants');
}

onClickdisplay(){
  this.router.navigateByUrl('shop');
}

postMyData(data)
{
  this._user.postad(data);
}

searchtMyData(data){
  this.srchterm=data.searchterm;
  this.newMessage();
  this.router.navigateByUrl('/shop');
}
}
