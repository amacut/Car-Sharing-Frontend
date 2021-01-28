import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {
  mainUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  getAllRentals(userId): Observable<any> {
    return this.http.get<any>(this.mainUrl + 'rentals/' + userId);
  }
  getRentalsDetails(rentId): Observable<any> {
    return this.http.get<any>(this.mainUrl + 'rentalsDetails/' + rentId);
  }
}
