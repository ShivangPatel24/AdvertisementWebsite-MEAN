import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ForsignupService {

  constructor(private http:HttpClient) { }

  private messagesoruce = new BehaviorSubject<string>("Mobile");
  currentMessage = this.messagesoruce.asObservable();

  changeMessage(message:string){
    this.messagesoruce.next(message);
  }

  registerUser(body:any){
    this.http.post('http://localhost:3000/register',body).subscribe(res => {
      console.log(res);
    })
  }

  verifyUser(body:any){
    return this.http.post('http://localhost:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  user(){
    return this.http.get('http://localhost:3000/users/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  logout(){
    return this.http.get('http://localhost:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  postad(body:any){
    this.http.post('http://localhost:3000/postit',body).subscribe(res => {
      console.log(res);
    })
  }

  search(body:any):Observable<any[]>{
    return this.http.post<any[]>('http://localhost:3000/searchter',body)
  }

  getads():Observable<any[]>
  {
    return this.http.get<any[]>('http://localhost:3000/getads')
  }

  
}
