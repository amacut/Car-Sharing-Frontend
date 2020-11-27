import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MapService} from '../map.service';



@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) {
  }

  getAddress(lat: number, lng: number): void {
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=
    console.log('get');
    this.http.get(this.geocodeUrl + '?latlng=' + lat + ',' + lng + '&key=' + MapService.mapKey).subscribe(data => {
      console.log(data);
    });
  }
}
