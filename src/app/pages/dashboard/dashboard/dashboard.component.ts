import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IncidentService } from '../../../services/incident.service';
import { LoginService } from '../../../services/login.service';
import { IIncident } from '../../../services/incident';
//import {MatSortModule} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../dashboard/createIncident/create/create.component';
import { Router } from '@angular/router';
import { EditIncidentComponent } from './editIncident/edit-incident/edit-incident.component';
//import * as EventEmitter from 'node:events';

import { Input, Output, EventEmitter } from '@angular/core';
import { CloseIncidentComponent } from './closeIncident/close-incident/close-incident.component';
import { ShowAuditComponent } from './showAudit/show-audit/show-audit.component';
import { ViewDescriptionComponent } from './viewDescription/view-description/view-description.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','time','status', 'actions'];
  displayedColumns: string[] = [
    'incidentRecordNumber',
    'userName',
    'contactNumber',
    'incidentType',
    'incidentPriority',
    'incidentStatus',
    'createdOn',
    'actions',
  ];
  closed = 0;
  pending = 0;
  inProcess = 0;
  completed = 0;
  incidents = 0;
  status = 0;
  content = '';
  dataSource: MatTableDataSource<IIncident>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isuserTypeAdmin = false;

  ELEMENT_DATA: PeriodicElement[];
  constructor(
    private _incidentService: IncidentService,
    public dialog: MatDialog,
    public router: Router,
    private loginService: LoginService
  ) {
    //console.log("Waah", this._incidentService.getIncidentData());
    this.ELEMENT_DATA = this._incidentService.getIncidents();

    //this.dataSource = ELEMENT_DATA;
  }

  listOfIncidents: IIncident[];

  username: string;

  public highPriority = {
    color: 'white',
    'background-color': '#ff6161',
  };

  public mediumPriority = {
    'background-color': '#ffbf00',
  };

  public lowPriority = {
    'background-color': '#bfff00',
  };

  public newStatus = {
    'background-color': '#f0df4a',
  };

  public inProgressStatus = {
    'background-color': '#00bfff',
  };

  public dispatchedStatus = {
    color: 'white',
    'background-color': '#8000ff',
  };

  public closedStatus = {
    color: 'white',
    'background-color': 'grey',
  };

  ngOnInit(): void {
    this._incidentService.getUserData().subscribe(
      (data: any) => {
        console.log('data999', data);

        if (data && data.status === 'ok') {
          this.username = data.user.username;
          this.loginService.authenticate();
          this.loginService.setUsername(this.username);
          this.isuserTypeAdmin = data.user.userType === 'Admin';
          this.statsResolved();
          this._incidentService.getIncidentData(data.user.username).subscribe(
            (data) => {
              console.log('data123', data);

              data.reverse();

              this.listOfIncidents = data;
              this.dataSource = new MatTableDataSource(this.listOfIncidents);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.fetchUserStats();
              this.userstatsPerc();
              this.filterOnlyActive();
              this.statsResolved();
              
            },
            (err) => {
              console.log('errro333', err);
            }
          );
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log('error222', error);
        this.router.navigate(['/login']);
      }
    );
  }

  fetchUserStats() {
    console.log('fetched data', this.listOfIncidents);
    console.log('array length:', this.listOfIncidents.length);
    console.log('fetched data', this.listOfIncidents[0].incidentStatus);
    if (this.listOfIncidents.length > 0) {
      for (let i = 0; i < this.listOfIncidents.length; i++) {
        if (this.listOfIncidents[i].incidentStatus == 'CLOSED') {
          this.closed = this.closed + 1;
          //console.log(closed);
        } else if (this.listOfIncidents[i].incidentStatus == 'NEW') {
          this.pending = this.pending + 1;
        } else if (this.listOfIncidents[i].incidentStatus == 'IN-PROGRESS') {
          this.inProcess = this.inProcess + 1;
        } else {
          this.completed = this.completed + 1;
        }
        console.log(this.listOfIncidents.length);
        this.incidents = this.listOfIncidents.length;
        // console.log('close', closed);
        // console.log('new', pending);
        // console.log('inprocess', inProcess);
      }
    }
  }

  userstatsPerc() {
    this.status = Math.round((this.closed * 100) / this.listOfIncidents.length);
  }

  statsResolved() {
    if (this.isuserTypeAdmin) {
      //console.log('admin');
      this.content = ` Hey ${this.username}, You resolved ${this.closed} incidents today.`;
      
    }else {
      //console.log('user');
      this.content = ` Hey ${this.username},
      Your ${this.closed} incidents have been resolved.`;
    }
  }
  ngAfterViewInit() {
    //this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    // this.dataSource = new MatTableDataSource(this.listOfIncidents);
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort=this.sort
  }

  applyFilter(event: Event) {}

  openCreateDialogBox() {
    this.dialog.open(CreateComponent, {
      data: { dialogRef: this.dialog },
    });
  }

  openEditDialogBox(value: any) {
    console.log('openEditDialogBox', value);

    this.dialog.open(EditIncidentComponent, {
      data: { incidentRecordId: value },
    });
  }

  closeTicketDialogBox(value: any) {
    this.dialog.open(CloseIncidentComponent, {
      data: { incidentRecordId: value },
    });
  }

  filterOnlyActive() {
    let allIncidentList = [...this.listOfIncidents];
    allIncidentList = allIncidentList.filter(
      (incident) => incident.incidentStatus !== 'CLOSED'
    );
    this.dataSource = new MatTableDataSource(allIncidentList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showAll() {
    this.dataSource = new MatTableDataSource(this.listOfIncidents);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onShowAuditClick(value: any) {
    this.dialog.open(ShowAuditComponent, {
      data: { incidentRecordId: value },
    });
  }

  onViewDescClick(value: any) {
    this.dialog.open(ViewDescriptionComponent, {
      data: { incidentRecordId: value },
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  time: string;
  status: string;
  actions: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',time:'t',status:'s',actions:''},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',time:'t',status:'s',actions:''},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',time:'t',status:'s',actions:''},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',time:'t',status:'s',actions:''},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',time:'t',status:'s',actions:''},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',time:'t',status:'s',actions:''},
// ];
