import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import { ProfileComponent } from '../profile/profile.component';
import {IncidentService} from '../../services/incident.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  

  constructor(public _loginService:LoginService, public router: Router, public dialog:MatDialog, private incidentService:IncidentService) {

  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true)
  }



  scroll = (event:any): void => {
    let scrollHeight = 50;
 
	if(window.scrollY >= scrollHeight){
		document.body.style.setProperty('--navbar-scroll', "white");
		document.body.style.setProperty('--navbar-scroll-shadow', "0px 6px 12px -5px #000000");
	}else if(window.scrollY < scrollHeight){
		document.body.style.setProperty('--navbar-scroll', "transparent");
		document.body.style.setProperty('--navbar-scroll-shadow', "none");
	}
  }

  onLogoutClick(){
    localStorage.removeItem('token');
    this._loginService.deauthenticate();
    this.router.navigate(['/login']);
  }

  openProfileDialogBox(){

    this.dialog.open(ProfileComponent)
  }
 
 

}
