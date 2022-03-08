import { Component, Inject, OnInit, Optional } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-description',
  templateUrl: './view-description.component.html',
  styleUrls: ['./view-description.component.css']
})
export class ViewDescriptionComponent implements OnInit {

  incidentRecordId:string; 

  incident:any;

  isDataLoaded:boolean = false;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private incidentService:IncidentService) 
  {
    this.incidentRecordId = data.incidentRecordId;
  }

  ngOnInit(): void {
    this.incidentService.getIncidentByRecordNumber(this.incidentRecordId)
    .subscribe(
      (data:any)=>{
        console.log("data555", data);

        if(data && data.status === "ok"){
          this.isDataLoaded = true;
          this.incident = data.incidentDetails;
        }
        

      },
      err=>{

      }
    )

  }

}
