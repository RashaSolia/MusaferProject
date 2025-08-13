import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  isLoading:boolean=false

  constructor(private _Auth:AuthService,private _Router:Router){}



 LoginForm:FormGroup=new FormGroup({

  email:new FormControl(null, [Validators.required, Validators
      .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][A-Za-z0-9@#*&^%!]*$')]),

      
    });
 
  
 
    onSubmit() {
      this._Auth.signIn(this.LoginForm.value).subscribe(
   {
next:()=>{
  if (localStorage.getItem('token')) {
    this._Router.navigate(['./home']);
  }
  console.log("success");

         
        }, 
        error :(err)=> {
          console.log(err.error.message);
          console.log(err );
          if(err.error.message === 'Invalid email or password.'){
           console.log('sh5al')
            this.showErrorAlert()
          }
        }
        }  )
    }
    

 

    showErrorAlert() {
      const errorMessageElement = document.getElementById('errorMessage');
      if (errorMessageElement !== null) {
        errorMessageElement.style.display = 'block';
      } else {
        console.error('Element with id "errorMessage" not found.');
      }
    }
    
   
 
}
