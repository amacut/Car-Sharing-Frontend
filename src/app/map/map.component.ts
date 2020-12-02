import {Component, Directive, OnInit, AfterViewInit} from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {take} from 'rxjs/operators';
import {VehiclesService} from '../vehicles/vehicles.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {VehiclesComponent} from '../vehicles/vehicles.component';
import {DirectionsService} from './directions.service';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // zoom level and center position for the map
  zoom: number = 16;
  userLatitude: number;
  userLongitude: number;
  userIcon = 'https://img.icons8.com/office/40/000000/marker.png';
  vehicleIcon = 'http://maps.google.com/mapfiles/kml/pal4/icon54.png';

  origin: any;
  destination: any;

  constructor(private readonly geolocation$: GeolocationService,
              private vehicleService: VehiclesService,
              private http: HttpClient,
              private dialog: MatDialog,
              private directions: DirectionsService) {
  }

  ngOnInit(): void {
    // this.userLocation();
    // this.addAllVehiclesToMap();
    // this.getDirection();

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
  }

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

  vehiclesMarkers: marker[] = [];

  addMarker(lat: number, lng: number, id: number): void {
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

interface marker {
  id: number;
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
  // icon?: string;
}
