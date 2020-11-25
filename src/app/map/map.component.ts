import {Component, OnInit} from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {take} from 'rxjs/operators';
import {VehicleResponseInterface} from '../vehicles/vehicleResponseInterface';
import {VehiclesService} from '../vehicles/vehicles.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {VehiclesComponent} from '../vehicles/vehicles.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  vehicle: VehicleResponseInterface[];

  // zoom level and center position for the map
  zoom: number = 16;
  userLatitude: number;
  userLongitude: number;
  geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  userIcon = 'https://img.icons8.com/office/40/000000/marker.png';
  vehicleIcon = 'http://maps.google.com/mapfiles/kml/pal4/icon54.png';

  constructor(private readonly geolocation$: GeolocationService,
              private vehicleService: VehiclesService,
              private http: HttpClient,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userLocation();
    let allVehicles = this.vehicleService.getVehicles();
    allVehicles.subscribe(response => {
      response.forEach(value => {
        this.addMarker(value.latitude, value.longitude);
        // this.getAddress(value.latitude, value.longitude);
      });
    });
  }
  getAddress(lat: number, lng: number): void {
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCRuLGe61gWt6aIlwlHKgetiYdjP48relQ
    console.log('get');
    this.http.get(this.geocodeUrl + '?latlng=' + lat + ',' + lng + '&key=AIzaSyCRuLGe61gWt6aIlwlHKgetiYdjP48relQ').subscribe(data => {
      console.log(data);
    });
  }

  userLocation() {
    this.geolocation$.pipe(take(1)).subscribe(position => {
      this.userLatitude = position.coords.latitude;
      this.userLongitude = position.coords.longitude - 0.008;
    });
  }
  vehiclesMarkers: marker[] = [];

  addMarker(lat: number, lng: number) {
    this.vehiclesMarkers.push(
      {lat: lat, lng: lng}
    );
  }
  clickedMarker(id: number) {
    // this.vehicleService.getInfo(id);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
  this.dialog.open(VehiclesComponent, dialogConfig);
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
