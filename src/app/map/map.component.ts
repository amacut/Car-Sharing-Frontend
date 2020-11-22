import { Component, OnInit } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {take} from 'rxjs/operators';
import {VehicleResponseInterface} from '../vehicles/vehicleResponseInterface';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
vehicle: VehicleResponseInterface[];
  // google maps zoom level
  zoom: number = 8;
  // initial center position for the map
  latitude: number;
  longitude: number;
  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  constructor(private readonly geolocation$: GeolocationService) {
    this.geolocation$.pipe(take(1)).subscribe(position => {
      this.latitude = position.coords.latitude ;
      this.longitude = position.coords.longitude - 0.008;
    });
  }
  ngOnInit(): void {
  }
  vehicles: marker[] = [
    {
      lat: 51.373858,
      lng: 7.815982,
      label: 'A',
      draggable: true,
      icon: this.iconBase + 'parking_lot_maps.png'
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false,
      icon: 'https://cdn0.iconfinder.com/data/icons/aami-flat-map-pins-and-navigation/64/location-65-512.png'
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];
}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  icon?: string;
}
