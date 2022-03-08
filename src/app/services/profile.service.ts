//import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ApiConstants} from '../../Scripts/apiHost';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient:HttpClient) { }

  editProfile(user:any){
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')
    .append('x-access-token',""+token);

    this.httpClient.post(ApiConstants.HOST+'/api/v1/user/update/'+user._id,JSON.stringify(user),{headers:headers})
    .subscribe(
      data=>{
        location.reload();
      },
      err=>{

      }
    )
  }
}
