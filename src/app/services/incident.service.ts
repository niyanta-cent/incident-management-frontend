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
export class IncidentService {

  constructor(private httpClient:HttpClient) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    gender: new FormControl('1'),
    department: new FormControl(0),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      gender: '1',
      department: 0,
    });
  }

  getIncidents(){

    const list = [
      {"incident_id":1, "incident_type": "Software", "incident_priority":"Low","username":"Hitesh","incident_record_number":"101"},
      {"incident_id":2, "incident_type": "Hardware", "incident_priority":"Medium","username":"Krunal","incident_record_number":"102"},
      {"incident_id":3, "incident_type": "Network", "incident_priority":"High","username":"Nidhi","incident_record_number":"103"},
    ];

    const ELEMENT_DATA = [
      {position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H',time:'t',status:'s',actions:''},
      {position: 12, name: 'Helium', weight: 4.0026, symbol: 'He',time:'t',status:'s',actions:''},
      {position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li',time:'t',status:'s',actions:''},
      {position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be',time:'t',status:'s',actions:''},
      {position: 15, name: 'Boron', weight: 10.811, symbol: 'B',time:'t',status:'s',actions:''},
      {position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C',time:'t',status:'s',actions:''},
    ];

    return ELEMENT_DATA;
  }

  getUserData(){

    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()

    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')
    .append('x-access-token',""+token);
    return this.httpClient.get(ApiConstants.HOST+'/api/v1/user/get-user-data',{headers:headers});
    
  }

  getIncidentData(username:string):Observable<any>{
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')
    .append('x-access-token',""+token);
    return this.httpClient.get(ApiConstants.HOST+'/api/v1/incident/'+username,{headers:headers});
    
  }

  createIncidentData(incident:any, username:string){
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')
    .append('x-access-token',""+token);
    incident.userName = username;
    console.log("incident123", incident);
    this.httpClient.post(ApiConstants.HOST+'/api/v1/incident/add',JSON.stringify(incident),{headers:headers})
    .subscribe(
      data=>{
        console.log("data999", data);
        
        
        this.getIncidentData(username)
        .subscribe(
          data=>{
            location.reload();
          },
          err=>{

          }
        )
      },
      err=>{
        console.log("error status 123 ",err.status)
      }
    )
  }

  getIncidentByRecordNumber(incidentRecordNumber:string){
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')
    .append('x-access-token',""+token);
    return this.httpClient.get(ApiConstants.HOST+'/api/v1/incident/record/'+incidentRecordNumber,{headers:headers});
  }


  editIncident(incidentDetails:any){
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')
    .append('x-access-token',""+token);
    this.httpClient.post(ApiConstants.HOST+'/api/v1/incident/update/'+incidentDetails._id,JSON.stringify(incidentDetails),{headers:headers})
    .subscribe(
      data=>{
        location.reload();
      },
      err=>{

      }
    )
  }

  closeIncident(incidentDetails:any){
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')
    .append('x-access-token',""+token);
    this.httpClient.post(ApiConstants.HOST+'/api/v1/incident/close/'+incidentDetails._id,JSON.stringify(incidentDetails),{headers:headers})
    .subscribe(
      data=>{
        location.reload();
      },
      err=>{

      }
    )

  }

  getAuditData(incidentRecordNumber:string){
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')
    .append('x-access-token',""+token);
    return this.httpClient.get(ApiConstants.HOST+'/api/v1/incident/audits/get/'+incidentRecordNumber,{headers:headers});
  }

  /*processCountIncident(username:string){

    let headers = new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Content-Type', 'application/json')

    return this.httpClient.get(ApiConstants.HOST+'/api/v1/incident/record/'+incidentRecordNumber,{headers:headers});
  }*/
}
