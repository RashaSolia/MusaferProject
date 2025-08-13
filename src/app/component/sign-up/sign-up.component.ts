import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private _Auth:AuthService, private _Router:Router){}
  errormassege:string=""
  isLoading:boolean=false

  
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('Repassword')?.value;

    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

resgisterForm:FormGroup=new FormGroup({
displayName:new FormControl(null, [Validators.required, Validators.minLength(4)]),
email:new FormControl(null, [Validators.required, Validators
  .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
  password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][A-Za-z0-9@#*&^%!]*$')]),
  Repassword:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][A-Za-z0-9@#*&^%!]{5,}$')]),
  phoneNumber:new FormControl (null, [Validators.required,Validators.pattern(/^\d{11}$/)])
// })
}, { validators: this.passwordMatchValidator.bind(this) });


signUp(registerForm:FormGroup){
  this.isLoading=true

 this._Auth.signUp(this.resgisterForm.value).subscribe({
  next:(Response)=>{
    console.log(Response)
    this.isLoading=false
    this.showSuccessAlert()
    this._Router.navigate(["./signin"]);

  },
  error: (err) => {
    console.log(err); // Log the entire error object to inspect its structure
    
   
      this.errormassege = err.error.errors[0];
      if (this.errormassege === 'This Email is Already Exist') {
        this.showErrorAlert();
      } 
    
    
  
    // this.isLoading = false;
  }
  
  


 }) 
 
}


 
 
showSuccessAlert() {
  const successMessageElement = document.getElementById('successMessage');
  if (successMessageElement !== null) {
    successMessageElement.style.display = 'block';
  } else {
    console.error('Element with id "successMessage" not found.');
  }
  
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
