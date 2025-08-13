import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _HttpClient:HttpClient) { }


  getTripData():Observable<any>{
    return this._HttpClient.get('https://localhost:7011/api/Trip')
  }
  
  getShipmentData():Observable<any>{
    return this._HttpClient.get('https://localhost:7011/api/Shipments')
  }

  getShipmentDetails(id:string):Observable<any>{
    return this._HttpClient.get(`https://localhost:7011/api/Shipments/${id}`)
  }


}
