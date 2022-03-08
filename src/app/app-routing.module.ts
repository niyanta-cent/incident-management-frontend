import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [
  {"path":'home', component:HomeComponent, data:{title:"Home"}},
  {"path":'get-started',component:GetStartedComponent},
  {"path":'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  {"path": 'login', component:LoginComponent},
  {"path":'signin', component:SigninComponent},
  {"path":'signup', component:SigninComponent},
  {"path":'', redirectTo:'/home', pathMatch:'full'},
  {path: '404', component: HomeComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
