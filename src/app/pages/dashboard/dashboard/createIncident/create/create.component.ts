import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {IncidentService} from '../../../../../services/incident.service';

import {createIncidentModel} from './createIncident.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  user: createIncidentModel = new createIncidentModel();
  

  incidentForm:any;
  username:string;

  dialogRef:any;

  constructor(private service:IncidentService, private formBuilder:FormBuilder,@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef = data.dialogRef;
  }

  ngOnInit(): void {

    this.service.getUserData()
    .subscribe(
      (data:any)=>{
        if(data && data.status === "ok")
        {
          this.username = data.user.username;
        }
      },
      err=>{

      }

    )

    this.incidentForm = this.formBuilder.group({
      'incidentType':[this.user.incidentType],
      'incidentDescription':[this.user.incidentDescription],
      'incidentPriority':[this.user.incidentPriority],
      'contactNumber':[this.user.contactNumber]

    })
  }

  onSubmit(data:any){
    console.log("data900:",data);
  }

  onIncidentRegistration(){
    //console.log("user123", this.user, "asdads", this.incidentForm);
    // this.dialogRef.close(CreateComponent);
    // if(this.user.contactNumber == undefined || 
    //    this.user.contactNumber.trim() == "" ||
    //    this.user.incidentDescription == undefined ||
    //    this.user.incidentDescription.trim() == "" ||

    //   ){

    //   }


    this.service.createIncidentData(this.user,this.username);
  }

}
