import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { profileModel } from './profile.model';
import {IncidentService} from '../../services/incident.service';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;

  profileModel: profileModel;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private incidentService:IncidentService, private ProfileService:ProfileService) {

  }

  ngOnInit(): void {

    this.incidentService.getUserData()
    .subscribe(
      (data:any)=>{
        if(data && data.status === "ok")
        {
          console.log(data.user);
          this.user = data.user;

          this.profileModel = new profileModel(data.user._id, data.user.username,data.user.firstName, data.user.lastName, data.user.contact, data.user.email);
        }
      },
      err=>{
      }
    )
  }

  onProfileEdit(){
    console.log("incident9123", 'this.incident');

    this.ProfileService.editProfile(this.profileModel);
  }

}
