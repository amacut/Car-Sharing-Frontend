import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {MapKeyService} from '../mapKey.service';

@Injectable({
  providedIn: 'root'
})
export class DirectionsService {

  directionsApi = 'https://maps.googleapis.com/maps/api/directions/json';
key = 'https://maps.googleapis.com/maps/api/directions/jsonorigin=52.241846,20.920517&destination=52.236675,20.912138&key=AIzaSyDGjd_7MqYeQzmQpI-13UtkCXSf48HXD_k';
  constructor(private http: HttpClient) {
  }

  getRoute(): void {
    console.log('działa');
    this.http.get(this.directionsApi + 'origin=52.241846,20.920517&destination=52.236675,20.912138&key=' + MapKeyService.mapKey)
      .subscribe(data => {
        console.log(data);
      });
  }
}
