import { Component, OnInit } from '@angular/core';
import { UserSignupModel } from './user-signup-model';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  types=["Customer","Admin"];

  user: UserSignupModel = new UserSignupModel();

  userForm:any;

  message:string;

  constructor(private loginService:LoginService, public router: Router) { }

  ngOnInit(): void {
  }

  onUserSignup(userForm:NgForm){
    console.log("Sign_Up", this.user);
    console.log("userForm", userForm.valid);
    if(userForm.valid)
    {
      this.message = "";
      this.loginService.userSignUp(this.user)
      .subscribe(
        data=>{
          console.log("data", data);
          this.router.navigate(['/login']);
        },
        error=>console.log("error",error)
      )
    }else{
      this.message = "*Please enter all the details."
    }
  }

}
