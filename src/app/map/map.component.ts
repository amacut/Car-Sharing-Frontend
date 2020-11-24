import { Component, OnInit } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {take} from 'rxjs/operators';
import {VehicleResponseInterface} from '../vehicles/vehicleResponseInterface';
import {VehiclesService} from '../vehicles/vehicles.service';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
vehicle: VehicleResponseInterface[];

  // google maps zoom level
  zoom: number = 16;
  // initial center position for the map
  latitude: number;
  longitude: number;
  // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCRuLGe61gWt6aIlwlHKgetiYdjP48relQ
  userIcon = 'http://maps.google.com/mapfiles/kml/paddle/red-stars.png';
  vehicleIcon = 'http://maps.google.com/mapfiles/kml/pal4/icon54.png';
  constructor(private readonly geolocation$: GeolocationService, private vehicleService: VehiclesService) {
    this.geolocation$.pipe(take(1)).subscribe(position => {
      this.latitude = position.coords.latitude ;
      this.longitude = position.coords.longitude - 0.008;
    });
  }
  ngOnInit(): void {
    let allVehicles = this.vehicleService.getVehicles();
    allVehicles.subscribe(response => {
      response.forEach(value => {
        this.addMarker(value.latitude, value.longitude);
      });
    });
  }

  vehiclesMarkers: marker[] = [];
  addMarker(lat: number, lng: number) {
    this.vehiclesMarkers.push(
      {lat: lat, lng: lng}
    );
  }
}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
  // icon?: string;
}
