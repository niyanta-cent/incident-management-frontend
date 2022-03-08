import { Component, Inject, OnInit, Optional } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-audit',
  templateUrl: './show-audit.component.html',
  styleUrls: ['./show-audit.component.css']
})
export class ShowAuditComponent implements OnInit {

  incidentRecordId:string; 

  incident:any;

  isDataLoaded:boolean = false;

  auditLogs:any;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private incidentService:IncidentService) 
  {
    this.incidentRecordId = data.incidentRecordId;
  }

  ngOnInit(): void {

    this.incidentService.getAuditData(this.incidentRecordId)
    .subscribe(
      (data:any)=>{
        if(data && data[0]){
          this.isDataLoaded = true;
          this.auditLogs = data[0].logs;
        }
      },
      err=>{

      }
    )



    // this.incidentService.getIncidentByRecordNumber(this.incidentRecordId)
    // .subscribe(
    //   (data:any)=>{
    //     console.log("data555", data);

    //     if(data && data.status === "ok"){
    //       this.isDataLoaded = true;
    //       this.incident = data.incidentDetails;
    //     }
        

    //   },
    //   err=>{

    //   }
    // )
  }

}
