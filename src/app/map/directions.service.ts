import {Injectable, Input} from '@angular/core';
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';



@Injectable({
  providedIn: 'root'
})
export class DirectionsService {
  @Input() origin: ILatLng;
  @Input() destination: ILatLng;

  constructor(
              ) {

  }

// calculateDistance(point1, point2) {
//   const p1 = new google.maps.LatLng(
//     point1.lat,
//     point1.lng
//   );
//   const p2 = new google.maps.LatLng(
//     point2.lat,
//     point2.lng
//   );
//   return (
//     google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000
//   ).toFixed(2);
// }
}
export interface ILatLng {
  latitude: number;
  longitude: number;
}



interface RouteDetails {
  distance: any;
  duration: any;
}
