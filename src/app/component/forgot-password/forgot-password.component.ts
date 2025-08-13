import { Component ,Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
 
constructor(private _AuthService:AuthService , private _Router:Router){}
forgotPasswordForm: FormGroup = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email])
});
SharedMail:any
token:any
forgotpassword(forgotPasswordForm: FormGroup) {
  console.log(forgotPasswordForm);
  this.SharedMail = forgotPasswordForm.value.email;

  console.log(this.SharedMail);
  localStorage.setItem('email',this.SharedMail)
  this._AuthService.forgetPassword(forgotPasswordForm.value).subscribe({
    next:(response)=>{
      console.log(response)
      if(response.message == "Success"){
        this.token =response.token
        localStorage.setItem('PasswordToken',this.token)
         this._Router.navigate(['resetCode']);
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}



}
