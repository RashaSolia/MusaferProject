import { DecimalPipe } from "@angular/common";




export interface IOrder {
    id: number;
    availableKg: number;
    arrivalTime: Date;
    fromCityName: string;
    countryNameFrom: string;
    toCityName: string;
    countryNameTo: string;
  }