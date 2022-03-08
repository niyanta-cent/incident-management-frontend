import { Component, OnInit } from '@angular/core';
//import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import { UserLoginModel } from './user-login-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 // protected aFormGroup!: FormGroup;

  user: UserLoginModel = new UserLoginModel();

  constructor(private loginService:LoginService, public router: Router) {}

  userForm:any;

  ngOnInit() {
    // this.aFormGroup = this.formBuilder.group({
    //   recaptcha: ['', Validators.required]
    // });

    // this.userForm = this.formBuilder.group({
    //   'incidentType':[this.user.username],
    //   'incidentDescription':[this.user.password]

    // })
  }

  onUserLogin(){
    console.log("this.user123", this.user);
    this.loginService.userLogin(this.user)
    .subscribe(
      (data:any)=>{
        console.log("data333", data)
        if(data.status === "ok" && data.token){
          localStorage.setItem('token',data.token);
          this.loginService.authenticate()
          this.router.navigate(['/dashboard']);
          
        }
      },
      error=>console.log("error124", error)
    )
    
    
  }

  siteKey:string ="6LfghoMaAAAAAMSIvjUm6B9I3jztYtXL7HvyjUkx";
}


