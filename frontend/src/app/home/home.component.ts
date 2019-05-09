import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import * as $ from 'jquery';
import { ForsignupService } from '../forsignup.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:String='';
  public srchterm;
  constructor(private _user:ForsignupService,private router: Router){
 
    this._user.user()
    .subscribe(
      data=>this.addName(data),
      error=>this.router.navigateByUrl('/login')
    )
  }
  addName(data){
    this.username = data.name;
  }
  newMessage(){
    this._user.changeMessage(this.srchterm)
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

      $(window).scroll(function() {
        $(".slideanim").each(function(){
          var pos = $(this).offset().top;

          var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
              $(this).addClass("slide");
            }
        });
      });
    })


    var myIndex = 0;
    carousel();

    function carousel() {
        var i;
        var x = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";
        }
        myIndex++;
        if (myIndex > x.length) {myIndex = 1}
        x[myIndex-1].style.display = "block";
        setTimeout(carousel, 2500);
    }
  }

  public onClickpost(){
  //this.nn="hiii";
  //alert(x);
  this.router.navigateByUrl('/postad');
  //window.open('/restaurants');
}
logout(){
  this._user.logout()
  .subscribe(
    data=>{console.log(data);this.router.navigateByUrl('/login')},
    error=>console.error(error)
  )
}

searchtMyData(data){
  this.srchterm=data.searchterm;
  this.newMessage();
  this.router.navigateByUrl('/shop');
}

}
