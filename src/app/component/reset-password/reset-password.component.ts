import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  
  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null),
    email: new FormControl(null),
    token: new FormControl(null)

  });

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  sharedMail:any;
  token:any;
  ngOnInit() {
    this.sharedMail=localStorage.getItem('email')  
    this.token=localStorage.getItem('PasswordToken')
    console.log(this.sharedMail)
  }


  resetpassword(resetPasswordForm: FormGroup) {
    console.log("Form value:", resetPasswordForm.value);
    
    // Log the value of sharedMail before assigning it to the form
    console.log("Before setting sharedMail:", this.sharedMail);
  
    // Set sharedMail to the email from the form
    const emailValue = resetPasswordForm.value.email;
    this.sharedMail = emailValue;
    const TokenValue = resetPasswordForm.value.token;
    this.token=TokenValue
    
    // Log the value of sharedMail after setting it
    console.log("After setting sharedMail:", this.sharedMail);
  
    // Update the value of the email field in the form
    resetPasswordForm.patchValue({
      email: emailValue,
      token:TokenValue
   });
  
    // Call the AuthService to verify the reset password code
    this._AuthService.resetPassword(resetPasswordForm.value).subscribe({
      next: (response) => {
        console.log(response);
       if(response.message === "Password reset successfully."){
        this._Router.navigate(['signin']);
        localStorage.removeItem('PasswordToken')
        localStorage.removeItem('email')

       }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  



}
