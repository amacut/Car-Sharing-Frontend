import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {MapService} from '../map.service';

@Injectable({
  providedIn: 'root'
})
export class DirectionsService {

  directionsApi = 'https://maps.googleapis.com/maps/api/directions/json';

  constructor(private http: HttpClient) {
  }

  getRoute(): void {
    console.log('działa');
    this.http.get(this.directionsApi + 'origin=52.241846,20.920517&destination=52.236675,20.912138&key=' + MapService.mapKey)
      .subscribe(data => {
        console.log(data);
      });
  }
}
