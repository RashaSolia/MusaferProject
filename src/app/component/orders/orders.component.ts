import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AuthService } from '../Service/auth.service';
import { TripServiceService } from '../Service/trip-service.service';
import { IOrder } from '../../models/trip';
import {  Observable ,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../Service/data.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
 
 
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders?: IOrder[];
  message: string = '';
  closeResult = '';
  modalRef: NgbModalRef | undefined;
  secondModalRef: NgbModalRef | undefined; // Reference to the second modal

  constructor(private modalService: NgbModal ,private _TripServiceService:TripServiceService,private _Auth:AuthService,private _DataService:DataService,private toastr: ToastrService) {
    this.getCity()
    this.getCategorey()
 
    this.secondModalContent = new ElementRef<any>(null);

  }
  @ViewChild('secondModalContent', { static: false }) secondModalContent: ElementRef;

  ngOnInit()  {

    this.getTrip()
    // throw new Error('Method not implemented.');
    this.getshipment()
   }
 
   
  open(content: any) {
    if (this.modalRef) {
      this.modalRef.close();
    }

    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
   openSecondModal(secondModalContent: any) {
    if (this.modalRef) {
      this.modalRef.close();
    }

    if (this.secondModalRef) {
      this.secondModalRef.close();
    }

    this.secondModalRef = this.modalService.open(secondModalContent, { ariaLabelledBy: 'modal-basic-title' });

    this.secondModalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );

 
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  datePickerConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY',
    showWeekNumbers: false,
    containerClass: 'theme-dark-blue',
  };

  selectedDate: Date = new Date();
  selectedOption: string = '1';

  onOptionChange() {
    // You can perform additional actions here if needed
  }


// ______________Get city data ____________
cityarr:any[]=[];
getCity(){
  this._TripServiceService.getCities().subscribe((Response)=>{
    console.log(Response)
this.cityarr=Response
  })
}

categoreyarr:any[]=[];
getCategorey(){
  this._TripServiceService.getCategorey().subscribe((Response)=>{
    console.log(Response)
this.categoreyarr=Response
  })
}
 
Tripform: FormGroup = new FormGroup({
  availableKg: new FormControl(null, [Validators.required, Validators.max(15)]),
  arrivalTime: new FormControl(null, [this.dateValidator]),  // Bind the validator function
  fromCityName: new FormControl(null),
  countryNameFrom: new FormControl(null),
  toCityName: new FormControl(null),
  countryNameTo: new FormControl(null),
});

dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control?.value) {
      const today = new Date();
      const dateToCheck = new Date(control.value);
      if (dateToCheck < today) {
          return {
            'Invalid date': true
          }

      }
  }
  return null;
}
isDateInvalid: boolean = false;


Shipmentform:FormGroup=new FormGroup({
  reward:new FormControl(null),
   dateOfRecieving:new FormControl(null),
  fromCityName:new FormControl(null),
  countryNameFrom:new FormControl(null),
  toCityName:new FormControl(null),
  countryNameTo:new FormControl(null),
  address:new FormControl(null),
  productName:new FormControl(null),
  productPrice:new FormControl(null),
  productWeight:new FormControl(null ,[Validators.required, Validators.max(15)]),
  weight:new FormControl(null ,[Validators.required, Validators.max(15)]),
  image:new FormControl(null),
  categoryName:new FormControl(null),
})

  
createTrip(formData:FormGroup){
  
  console.log("createTrip",formData.value)
this._TripServiceService.createTrip(formData.value).subscribe({
next:(Response)=>{
  
  console.log(Response.message)
  console.log(Response); // تحقق من الرد للتأكد من أن الرحلة تمت إضافتها بنجاح
  const newTrip = Response.trip; // تحديد كيفية الوصول إلى الرحلة الجديدة في الرد
  this.gettrip.unshift(newTrip);
  if(Response.message === 'Trip Created Successfully'){
   
    this.showSuccessAlert();
  }

},
error:(err)=>{
  this.showErrorAlert();
  console.log(err)
}
})

 
}



gettrip:any[]=[]
getTrip(){
  this._DataService.getTripData().subscribe((data)=>{
    console.log(data.data)
    // this.gettrip=data.data
    data.data.forEach((item:any) => {
      this.gettrip.unshift(item); // Add each item individually to the beginning of the array
    });
    console.log(this.gettrip); // Make sure the new items are added to the beginning of the array
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



// createShipment(formData: FormData) {
//   console.log("createShipment", formData);
//   this._TripServiceService.createShipment(formData).subscribe({
//     next: (Response) => {
//        console.log(Response)
//        const newSipment = Response.shipment; // تحديد كيفية الوصول إلى الرحلة الجديدة في الرد
//        this.getShipment.unshift(newSipment);
//       if(Response.message===`shipment Created Successfully`){
//         this.showSuccessAlert();
//       }
    
//     },
//     error:(err)=>{
//       this.showErrorAlert();
//       console.log(err)
//     }
//   });
// }
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.Shipmentform.patchValue({
      image: file
      
    });
    
  }
}
onSubmit() {
  const formData = new FormData();
  formData.append('reward', this.Shipmentform.get('reward')?.value);
  formData.append('dateOfRecieving', this.Shipmentform.get('dateOfRecieving')?.value);
  formData.append('fromCityName', this.Shipmentform.get('fromCityName')?.value);
  formData.append('countryNameFrom', this.Shipmentform.get('countryNameFrom')?.value);
  formData.append('toCityName', this.Shipmentform.get('toCityName')?.value);
  formData.append('countryNameTo', this.Shipmentform.get('countryNameTo')?.value);
  formData.append('address', this.Shipmentform.get('address')?.value);
  formData.append('productName', this.Shipmentform.get('productName')?.value);
  formData.append('productPrice', this.Shipmentform.get('productPrice')?.value);
  formData.append('productWeight', this.Shipmentform.get('productWeight')?.value);
  formData.append('weight', this.Shipmentform.get('weight')?.value);
  const imageFile: File = this.Shipmentform.get('image')?.value;
  formData.append('image', imageFile); 
   formData.append('categoryName', this.Shipmentform.get('categoryName')?.value);


  formData.forEach((value, key) => {
    console.log(key + ': ' + value);
  });
  this.createShipment(formData);

}
getShipment:any[]=[]
getshipment(){
  this._DataService.getShipmentData().subscribe((data)=>{
    console.log(data.data)
    // this.getShipment=data.data
    data.data.forEach((item:any) => {
      this.getShipment.unshift(item); // Add each item individually to the beginning of the array
    });
  })
}


createShipment(formData: FormData) {
  console.log("createShipment", formData);
  this._TripServiceService.createShipment(formData).subscribe({
    next: (Response) => {
       console.log(Response)
       const newShipment = Response.shipment; // Access the new shipment in the response
       this.getShipment.unshift(newShipment);
      if(Response.message === `shipment Created Successfully`){
        this.showSuccessAlert();
      }
    
    },
    error: (err) => {
      this.showErrorAlert();
      console.log(err)
    }
  });
}

// onSubmit() {
//   // Retrieve the selected values from the form
//   const formData = new FormData();
//   const countryNameFrom = this.Shipmentform.get('countryNameFrom')?.value;
//   const countryNameTo = this.Shipmentform.get('countryNameTo')?.value;
  
//   // Check if the same country is selected in both "From" and "To" dropdowns
//   if (countryNameFrom !== countryNameTo) {
//     // Append form data for shipment creation
//     formData.append('reward', this.Shipmentform.get('reward')?.value);
//     formData.append('dateOfRecieving', this.Shipmentform.get('dateOfRecieving')?.value);
//     formData.append('fromCityName', this.Shipmentform.get('fromCityName')?.value);
//     formData.append('countryNameFrom', countryNameFrom);
//     formData.append('toCityName', this.Shipmentform.get('toCityName')?.value);
//     formData.append('countryNameTo', countryNameTo);
//     formData.append('address', this.Shipmentform.get('address')?.value);
//     formData.append('productName', this.Shipmentform.get('productName')?.value);
//     formData.append('productPrice', this.Shipmentform.get('productPrice')?.value);
//     formData.append('productWeight', this.Shipmentform.get('productWeight')?.value);
//     formData.append('weight', this.Shipmentform.get('weight')?.value);
//     const imageFile: File = this.Shipmentform.get('image')?.value;
//     formData.append('image', imageFile); 
//     formData.append('categoryName', this.Shipmentform.get('categoryName')?.value);

//     // Log the form data
//     formData.forEach((value, key) => {
//       console.log(key + ': ' + value);
//     });

//     // Call the createShipment method
//     this.createShipment(formData);
//   } else {
//     // Show error message or handle the case where the same country is selected in both dropdowns
//     console.error("The same country cannot be selected in both 'From' and 'To' dropdowns.");
//   }
// }

AccountVerificationForm:FormGroup=new FormGroup({
  image1:new FormControl(null),
 })

onFileSelected2(event: any, field: string) {
  const file: File = event.target.files[0];
  if (file) {
    this.AccountVerificationForm.patchValue({
      [field]: file
    });
  }
}

Verification(){
  const formData = new FormData();
  const firstImg: File = this.AccountVerificationForm.get('image1')?.value;
  formData.append('image1', firstImg);
  
  formData.forEach((value, key) => {
    console.log(key + ': ' + value);
  });
  this.verificationInProgress = false; // بدء التحقق

  this.TestVerifation(formData);
}
  
 
 
verificationInProgress: boolean = true;

TestVerifation(formData: FormData) {
  console.log("TestVerifation", formData);
  this._TripServiceService.imgVerification(formData).subscribe({
    next: (Response) => {
      console.log(Response);
      if (Response.matchStatus === 'Match') {
        this.showSuccessAlert();
     this.verificationInProgress=false
      }
    },
    error: (err) => {
      console.log(err.error.message)
      if (err.error.message === 'User already exists') {
        this.showSuccessAlert();
        this.verificationInProgress=false

      }
      else{
        this.showErrorAlert()
        this.verificationInProgress=true

      }
    }
  });
}

      

 
 
}