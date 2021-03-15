import {Component, OnInit} from '@angular/core';
import {VehiclesService} from '../services/vehicles.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {VehiclesComponent} from '../vehicles/vehicles.component';
import {take} from 'rxjs/operators';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AppComponent} from '../app.component';
import {Vehicle} from '../model/vehicle';
import {FortAwesomeService} from '../shared/fort-awesome/fort-awesome.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  // zoom level and center position for the map
  zoom = 16;

  userChangePosition: string;
  userIcon = 'https://img.icons8.com/office/40/000000/marker.png';
  freeVehicleIcon = 'http://maps.google.com/mapfiles/kml/pal4/icon54.png';
  vehicleChosenIcon = 'http://maps.google.com/mapfiles/kml/pal4/icon7.png';
  reservedVehicleIcon = 'http://maps.google.com/mapfiles/kml/pal4/icon23.png';


  constructor(private vehicleService: VehiclesService,
              private dialog: MatDialog,
              private readonly geolocation$: GeolocationService,
              private route: ActivatedRoute,
              private cookies: CookieService,
              private mainComponent: AppComponent,
              private icons: FortAwesomeService) {
  }

  exitIcon = this.icons.exit;
  vehicleDetails: Vehicle;
  showVehicleDetails = false;
  userPosition = this.mainComponent.userPosition;

  ngOnInit(): void {
    if (this.cookies.get('userPosition')) {
      this.userChangePosition = this.cookies.get('userPosition');
    }
    this.userLocation();
    this.addAllVehiclesToMap();
  }

  userLocation(): void {
    if (this.userChangePosition === 'true') {
      this.userPosition.latitude = parseFloat(this.cookies.get('userPositionLat'));
      this.userPosition.longitude = parseFloat(this.cookies.get('userPositionLng')) + 0.0005;
    } else {
      console.log('geo');
      this.geolocation$.pipe(take(1)).subscribe(position => {
        this.userPosition.latitude = position.coords.latitude - 0.010;
        this.userPosition.longitude = position.coords.longitude + 0.070;
      });
    }
  }


  addAllVehiclesToMap(): void {
    let allVehicles = this.vehicleService.getVehicles(this.cookies.get('id'));
    allVehicles.subscribe(response => {
      console.log(response);
      response.forEach(value => {
        if (value.vehicleStatus === 'FREE') {
          this.addMarker(value.latitude, value.longitude, value.id, this.freeVehicleIcon);
        } else {
          this.addMarker(value.latitude, value.longitude, value.id, this.reservedVehicleIcon);
        }

        // this.getAddress(value.latitude, value.longitude);
      });
    });
  }

  vehiclesMarkers: Marker[] = [];

  addMarker(lat: number, lng: number, id: number, vehicleIcon: string): void {
    this.vehiclesMarkers.push(
      {id: id, lat: lat, lng: lng, icon: vehicleIcon}
    );
  }

  clickedMarker(id: number): void {
    this.vehicleService.getVehicle(id).subscribe(
      response => {
        this.vehicleDetails = response;
        this.showVehicleDetails = true;
      }
    );
    document.querySelector('.modal-wrap').classList.add('active');
  }
  hideDetails(): void {
    document.querySelector('.modal-wrap').classList.remove('active');
  }

}

interface Marker {
  id?: number;
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
  icon?: string;
}
