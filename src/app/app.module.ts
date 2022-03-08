//Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxCaptchaModule} from 'ngx-captcha';
import {FormsModule} from '@angular/forms';

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { BasePageComponent } from './partials/base-page/base-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { CreateComponent } from './pages/dashboard/dashboard/createIncident/create/create.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';

import { ProfileComponent } from './partials/profile/profile.component';

//Material Module
import {MaterialModule} from './material/material/material.module';

//Services
import {IncidentService} from './services/incident.service';
import {LoginService} from './services/login.service';

//Http
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { EditIncidentComponent } from './pages/dashboard/dashboard/editIncident/edit-incident/edit-incident.component';
import { CloseIncidentComponent } from './pages/dashboard/dashboard/closeIncident/close-incident/close-incident.component';
import { ViewDescriptionComponent } from './pages/dashboard/dashboard/viewDescription/view-description/view-description.component';
import { ShowAuditComponent } from './pages/dashboard/dashboard/showAudit/show-audit/show-audit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GetStartedComponent,
    BasePageComponent,
    DashboardComponent,
    CreateComponent,
    LoginComponent,
    SigninComponent,
    EditIncidentComponent,
    CloseIncidentComponent,
    ProfileComponent,
    ViewDescriptionComponent,
    ShowAuditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [IncidentService, AuthGuard , LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
