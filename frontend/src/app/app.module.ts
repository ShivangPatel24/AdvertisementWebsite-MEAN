import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PostadComponent } from './postad/postad.component';

import {ForsignupService} from './forsignup.service';
import { ShopComponent } from './shop/shop.component';

const appRoutes :Routes=[
{path:'homepage',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'signup',component:SignupComponent},
{path:'postad',component:PostadComponent},
{path:'shop',component:ShopComponent},
{path:'',component:LoginComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostadComponent,
    ShopComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing:true //this is for debugging only
      }
    ),
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ForsignupService],
  bootstrap: [AppComponent,SignupComponent,HomeComponent,LoginComponent,PostadComponent]
})
export class AppModule { }
