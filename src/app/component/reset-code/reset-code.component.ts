import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.component.html',
  styleUrls: ['./reset-code.component.scss']
})
export class ResetCodeComponent implements OnInit {
 
  resetPasswordCodeForm: FormGroup = new FormGroup({
    verificationCode: new FormControl(null),
    email: new FormControl(null)

  });

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  sharedMail:any;
  ngOnInit() {
    this.sharedMail=localStorage.getItem('email')  
    console.log(this.sharedMail)
  }


  resetpasswordCode(resetPasswordCodeForm: FormGroup) {
    console.log("Form value:", resetPasswordCodeForm.value);
    
    // Log the value of sharedMail before assigning it to the form
    console.log("Before setting sharedMail:", this.sharedMail);
  
    // Set sharedMail to the email from the form
    const emailValue = resetPasswordCodeForm.value.email;
    this.sharedMail = emailValue;
    
    // Log the value of sharedMail after setting it
    console.log("After setting sharedMail:", this.sharedMail);
  
    // Update the value of the email field in the form
    resetPasswordCodeForm.patchValue({
      email: emailValue
    });
  
    // Call the AuthService to verify the reset password code
    this._AuthService.verifyCode(resetPasswordCodeForm.value).subscribe({
      next: (response) => {
        console.log(response);
        if(response.message==='Verification successful'){
          this._Router.navigate(['resetPassword']);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  


  
}
