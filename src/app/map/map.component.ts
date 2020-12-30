import {Component, Directive, OnInit} from '@angular/core';
import {VehiclesService} from '../services/vehicles.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {VehiclesComponent} from '../vehicles/vehicles.component';
import {DirectionsService} from './directions.service';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import {take} from 'rxjs/operators';
import {GeolocationService} from '@ng-web-apis/geolocation';


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
  // vehicleTakenIcon = 'http://maps.google.com/mapfiles/kml/pal4/icon7.png';
  // vehicleChosen = 'http://maps.google.com/mapfiles/kml/pal4/icon23.png';


  constructor(private vehicleService: VehiclesService,
              private dialog: MatDialog,
              private readonly geolocation$: GeolocationService) {
  }

  ngOnInit(): void {
    this.userLocation();
    this.addAllVehiclesToMap();
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

  vehiclesMarkers: Marker[] = [];

  addMarker(lat: number, lng: number, id: number): void {
    this.vehiclesMarkers.push(
      {id: id, lat: lat, lng: lng}
    );
  }

  clickedMarker(id: number): void {
    this.vehicleService.getVehicle(id).subscribe(
      response => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = '25%';
        dialogConfig.data = {
          response: response
        };
        this.dialog.open(VehiclesComponent, dialogConfig);
      });
  }

}

interface Marker {
  id?: number;
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
  // icon?: string;
}
