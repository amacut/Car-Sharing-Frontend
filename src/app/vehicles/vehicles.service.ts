import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {Observable} from 'rxjs';
import {VehicleResponseInterface} from './vehicleResponseInterface';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  vehiclesUrl = 'http://localhost:8080/';

  constructor( private http: HttpClient) {
  }

  getVehicles(): Observable<VehicleResponseInterface[]> {
return this.http.get<VehicleResponseInterface[]>(this.vehiclesUrl + 'all');
  }
}
