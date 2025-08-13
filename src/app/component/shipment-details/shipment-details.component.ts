import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.scss']
})
export class ShipmentDetailsComponent {
  shipmentId:any;
  shipmentDetails:any
constructor (private _ActivatedRoute:ActivatedRoute,private _DataService:DataService){
  this._ActivatedRoute.paramMap.subscribe((param)=>{
// console.log(param.get('id'))
this.shipmentId=param.get('id')
  })
  this.getDetails()
}

getDetails(){
  this._DataService.getShipmentDetails(this.shipmentId).subscribe((Response)=>{
console.log(Response)
this.shipmentDetails=Response
  })
}

}
