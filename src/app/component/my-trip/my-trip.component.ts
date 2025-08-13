import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrls: ['./my-trip.component.scss']
})
export class MyTripComponent {
  message: string = '';
  isMatchingUsername: boolean = true;

constructor(private _DataService:DataService, private _Auth:AuthService){

// if(this.message==this.gettrip){

// }
this.logMessage()

  this.getTrip()

}

 
gettrip:any[]=[]

getTrip(){
  this._DataService.getTripData().subscribe((data)=>{
    console.log(data.data)
    // this.gettrip=data.data
    data.data.forEach((item:any) => {
      this.gettrip.unshift(item); // Add each item individually to the beginning of the array
    });
    this.isMatchingUsername = this.gettrip.some(trip => trip.userName === this.message);
  })
}



logMessage() {
    this._Auth.decodedUserData()
  this.message = this._Auth.sharedVariable;
  console.log(this.message)
  }
}
