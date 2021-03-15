import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';



import {Observable} from 'rxjs';
import {Vehicle} from '../model/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  mainUrl = 'http://localhost:8080/';

  constructor( private http: HttpClient) {
  }

  getVehicles(id: string): Observable<Vehicle[]> {
return this.http.get<Vehicle[]>(this.mainUrl + 'all/' + id);
  }
  getVehicle(id: number): Observable<Vehicle>  {
    return this.http.get<Vehicle>(this.mainUrl + '/' + id);
  }
  changeVehiclePosition(id, latitude, longitude): Observable<any> {
    return this.http.patch<any>(this.mainUrl + 'changeVehicleDetails/' + id, {latitude, longitude});
  }
}

