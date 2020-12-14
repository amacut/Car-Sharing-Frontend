import {Component, Directive, OnInit, AfterViewInit} from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {take} from 'rxjs/operators';
import {VehiclesService} from '../vehicles/vehicles.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {VehiclesComponent} from '../vehicles/vehicles.component';
import {DirectionsService} from './directions.service';

import {AgmCoreModule, MapsAPILoader} from '@agm/core';


declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  // zoom level and center position for the map
  zoom = 16;
  userLatitude = 0;
  userLongitude = 0;
  userIcon = 'https://img.icons8.com/office/40/000000/marker.png';
  vehicleIcon = 'http://maps.google.com/mapfiles/kml/pal4/icon54.png';

  origin: any;
  destination: any;
  distance: any;
  directionsService: any;
  private directionsRenderer: any;
  showDirection: boolean;
  map: any;

  constructor(private readonly geolocation$: GeolocationService,
              private vehicleService: VehiclesService,
              private http: HttpClient,
              private dialog: MatDialog,
              private directions: DirectionsService,
              private mapsAPILoader: MapsAPILoader) {
  }

  ngOnInit(): void {
    this.userLocation();
    // this.addAllVehiclesToMap();
    this.mapsAPILoader.load().then(
      () => {
        this.getDirection();
      }
    );
  }
  getDirection() {
    this.origin = {
      lat: 52.241646,
      lng: 20.918474
    };
    this.destination = {
      lat: 52.248804,
      lng: 20.911253
    };
    const route = {
      origin: this.origin,
      destination: this.destination,
      travelMode: 'DRIVING'
    };

    if (!this.directionsRenderer) {
      this.directionsRenderer = new google.maps.DirectionsRenderer();
    }
    const directionsRenderer = this.directionsRenderer;
    const directionsService = new google.maps.DirectionsService();
    // this.distance = this.calculateDistance(this.origin, this.destination);
    directionsService.route(route,
      function (result, status) {
        if (status !== 'OK') {
          window.alert('Directions request failed due to ' + status);
          return;
        } else {
          directionsRenderer.setDirections(result);
          const directionsData = result.routes[0].legs[0];
          if (!directionsData) {
            window.alert('Directions request failed');
            return;
          } else {
            console.log('Driving distance is ' + directionsData.distance.text + ' (' + directionsData.duration.text + ').');
          }
        }
      });
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

  userLocation(): void {
    this.geolocation$.pipe(take(1)).subscribe(position => {
      this.userLatitude = position.coords.latitude;
      this.userLongitude = position.coords.longitude - 0.008;
    });
  }

  addAllVehiclesToMap(): void {
    let allVehicles = this.vehicleService.getVehicles();
    allVehicles.subscribe(response => {
      response.forEach(value => {
        this.addMarker(value.latitude, value.longitude, value.id);
        // this.getAddress(value.latitude, value.longitude);
      });
    });
  }

  vehiclesMarkers: Marker[] = [];

  addMarker(lat: number, lng: number, id: number):
    void {
    this.vehiclesMarkers.push(
      {id: id, lat: lat, lng: lng}
    );
  }

  clickedMarker(id: number) {
    this.vehicleService.getVehicle(id).subscribe(response => {
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '25%';
      dialogConfig.data = {
        response: response
      };
      this.dialog.open(VehiclesComponent, dialogConfig);
    });
  }

}

interface RouteDetails {
  distance: any;
  duration: any;
}

interface Route {
  origin: number;
  destination: number;
  travelMode: string;
}

interface Marker {
  id: number;
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
  // icon?: string;
}
