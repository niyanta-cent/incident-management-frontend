import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editIncidentModel } from './editIncident.model';
import {IncidentService} from '../../../../../services/incident.service';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css']
})
export class EditIncidentComponent implements OnInit {

  incidentRecordId:string;  
  incidentForm:any;

  incidentData:any;
  incident: editIncidentModel;
  isuserTypeAdmin: boolean;

  isDataLoaded:boolean = false;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private incidentService:IncidentService,private _incidentService:IncidentService) {
    this.incidentRecordId = data.incidentRecordId;
  }

  ngOnInit(): void {
    console.log("incidentRecordId900", this.incidentRecordId);
    //get Incident Data
    this.incidentService.getIncidentByRecordNumber(this.incidentRecordId)
    .subscribe(
      (data:any)=>{
        console.log("data555", data);

        if(data && data.status === "ok"){
          this.isDataLoaded = true;
          this.incidentData = data.incidentDetails;
          this.incident = new editIncidentModel(data.incidentDetails._id, data.incidentDetails.userName,data.incidentDetails.incidentRecordNumber,data.incidentDetails.incidentDescription,data.incidentDetails.contactNumber,data.incidentDetails.incidentStatus,data.incidentDetails.incidentType,data.incidentDetails.incidentPriority);
        }
      },
      err=>{

      }
    )

    this._incidentService.getUserData()
    .subscribe(
      (data:any)=>{
        console.log("data999", data);
        
        if(data && data.status === "ok")
        {

          this.isuserTypeAdmin = data.user.userType === "Admin";         
        }
        
      }
    )

  }

  onIncidentEdit(){
    console.log("incident9123", this.incident);

    this.incidentService.editIncident(this.incident);
    

  }

}
