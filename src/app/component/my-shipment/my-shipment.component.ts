import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-my-shipment',
  templateUrl: './my-shipment.component.html',
  styleUrls: ['./my-shipment.component.scss']
})
export class MyShipmentComponent {
  message: string = '';
  isMatchingUsername: boolean = false;

constructor(private _DataService:DataService, private _Auth:AuthService){

// if(this.message==this.gettrip){

// }
this.logMessage()

  this.getShipment()

}

 
getshipment:any[]=[]

getShipment(){
  this._DataService.getShipmentData().subscribe((data)=>{
    console.log(data.data)
    data.data.forEach((item:any) => {
      this.getshipment.unshift(item); // Add each item individually to the beginning of the array
    });
    this.isMatchingUsername=this.getshipment.some(shipment => shipment.userName == this.message)
   })
}



logMessage() {
    this._Auth.decodedUserData()
  this.message = this._Auth.sharedVariable;
  console.log(this.message)
  }
}
