import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DirectionsService {
  'https://maps.googleapis.com/maps/api/directions/json?origin=Chicago,IL&destination=Los+Angeles,CA&waypoints=Joplin,MO|Oklahoma+City,OK&key=AIzaSyDGjd_7MqYeQzmQpI-13UtkCXSf48HXD_k'
  // https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyDGjd_7MqYeQzmQpI-13UtkCXSf48HXD_k
  directionsApi = 'https://maps.googleapis.com/maps/api/directions/json?';
key = 'https://maps.googleapis.com/maps/api/directions/jsonorigin=52.241846,20.920517&destination=52.236675,20.912138&key=AIzaSyDGjd_7MqYeQzmQpI-13UtkCXSf48HXD_k';
  constructor(private http: HttpClient) {
  }
  getRoute(): void {
    console.log('działa');
    this.http.get(this.directionsApi + 'origin=52.241846,20.920517&destination=52.236675,20.912138&key=', {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    })
      .subscribe(data => {
        console.log(data);
      });
  }
}
