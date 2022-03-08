import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserLoginModel } from '../pages/login/user-login-model';
import { BehaviorSubject } from 'rxjs';

import {ApiConstants} from '../../Scripts/apiHost';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  authenticated$ :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 

  //usernameNavbar: BehaviorSubject<string> = new BehaviorSubject<string>("Profile");
  usernameNavbar:string = "Profile";

  public authenticate() {
    this.authenticated$.next(true);
  }

  public deauthenticate() {
    this.authenticated$.next(false);
  }

  public setUsername(username:string){
    this.usernameNavbar = username;

  }

  
  userLogin(user:UserLoginModel){
    console.log("user444", user);

    let headers = new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')

    return this.httpClient.post<any>(ApiConstants.HOST+"/api/v1/user/login",user,{headers:headers});
  }

  userSignUp(user:any){
    console.log("user900", user);

    let headers = new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')

    return this.httpClient.post<any>(ApiConstants.HOST+"/api/v1/user/create-user",user,{headers:headers});
  }

  userLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
}
