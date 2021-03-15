import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rental} from '../model/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {
  mainUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getAllRentals(userId): Observable<any> {
    return this.http.get<any>(this.mainUrl + 'rentals/' + userId);
  }

  getRentalsDetails(rentId): Observable<any> {
    return this.http.get<any>(this.mainUrl + 'rentalsDetails/' + rentId);
  }

  getRoutePrice(vehicleId: number, distance: number, drivingTime: number, stopOverTime: number): Observable<number> {
    return this.http.patch<number>(this.mainUrl + 'calculateRent/' + vehicleId, {distance, drivingTime, stopOverTime});
  }

  addNewRental(rental: Rental): Observable<any> {
    return this.http.post<any>(this.mainUrl + 'newRental', rental);
  }
}
