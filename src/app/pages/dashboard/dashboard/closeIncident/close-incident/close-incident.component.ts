import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IncidentService } from 'src/app/services/incident.service';
import { closeIncidentModel } from './closeIncident.model';

@Component({
  selector: 'app-close-incident',
  templateUrl: './close-incident.component.html',
  styleUrls: ['./close-incident.component.css']
})
export class CloseIncidentComponent implements OnInit {

  incidentRecordId:string; 

  incident:any;

  isDataLoaded:boolean = false;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private incidentService:IncidentService) {
    this.incidentRecordId = data.incidentRecordId;
  }




  ngOnInit(): void {

    this.incidentService.getIncidentByRecordNumber(this.incidentRecordId)
    .subscribe(
      (data:any)=>{
        console.log("data555", data);

        if(data && data.status === "ok"){
          this.isDataLoaded = true;
          this.incident = new closeIncidentModel(data.incidentDetails._id,data.incidentDetails.incidentRecordNumber,data.incidentDetails.incidentDescription,data.incidentDetails.incidentResolution);
          
        }
        

      },
      err=>{

      }
    )
  }

  onIncidentClose(){
    console.log("incident0123", this.incident);

    this.incidentService.closeIncident(this.incident);
    

  }

}
