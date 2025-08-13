import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { Iuser } from '../../iuser';
import { IOrder } from '../../models/trip';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripServiceService {
  orders?: IOrder[];
  private currentUserSource = new ReplaySubject<Iuser>(1);
  private TripSource = new BehaviorSubject<IOrder>(null as unknown as IOrder);
  trip$ = this.TripSource.asObservable();
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private _HttpClient:HttpClient) { }
  getCities(): Observable<any> {
    return this._HttpClient.get(`https://localhost:7011/api/City`);
  }
  getCategorey(): Observable<any> {
    return this._HttpClient.get(`https://localhost:7011/api/Categories`);
  }
 
  createTrip(formData: any): Observable<any> {
    return this._HttpClient.post(`https://localhost:7011/api/Trip/CreateTrip`, formData) 
  }
 
  createShipment(formData: any): Observable<any> {
    const url = 'https://localhost:7011/api/Shipments/CreateShipment';
    return this._HttpClient.post(url, formData);
  }

   
  imgVerification(formData: any): Observable<any> {
    const url = 'https://localhost:7011/api/CompareFlask/compare-faces';
    return this._HttpClient.post(url, formData);
  }
}

   




