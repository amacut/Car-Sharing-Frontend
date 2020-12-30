import {Component, OnInit} from '@angular/core';
import {VehiclesComponent} from '../../vehicles/vehicles.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {map} from 'rxjs/operators';
import DirectionsResult = google.maps.DirectionsResult;
import {FortAwesomeService} from '../../shared/fort-awesome/fort-awesome.service';

declare var google: any;

@Component({
  selector: 'app-map-destination',
  templateUrl: './map-destination.component.html',
  styleUrls: ['./map-destination.component.css']
})
export class MapDestinationComponent implements OnInit {

  showDirection: boolean;
  selectedRoute: boolean;
  private directionsRenderer: any;
  origin: any = {
    latitude: 0,
    longitude: 0
  };
  destination: any = {
    latitude: 0,
    longitude: 0
  };
  zoom = 16;
  routeDetails: RouteDetails;

  constructor(private route: ActivatedRoute,
              private mapsAPILoader: MapsAPILoader,
              private gMapsApi: GoogleMapsAPIWrapper,
              private icons: FortAwesomeService) {
  }

  back = this.icons.back;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.origin = {
        latitude: parseFloat(params['vehicleLatitude']),
        longitude: parseFloat(params ['vehicleLongitude'])
      };
    });
  }

  showRouteDetails(): void {
    this.selectedRoute = true;
  }

  changeView(): string {
    return this.selectedRoute === true ? '65.6%' : '100%';
  }

  mapClicked(event) {
    const lat = event.coords.lat;
    const lng = event.coords.lng;
    this.destination.latitude = parseFloat(lat);
    this.destination.longitude = parseFloat(lng);
    this.destinationMarkers.length = 0;
    this.destinationMarkers.push({
      latitude: lat,
      longitude: lng
    });
    console.log(typeof (this.origin.latitude),
      typeof (this.origin.longitude),
      typeof (this.destination.latitude),
      typeof (this.destination.longitude));
    console.log(this.origin.latitude,
      this.origin.longitude,
      this.destination.latitude,
      this.destination.longitude);
    console.log('mapClicked ' + lat, lng);
    console.log('dest ' + this.destination.latitude, this.destination.longitude);
    this.showDirection = true;
    this.mapsAPILoader.load().then(
      () => {
        this.getDirection();
      }
    );
  }

  getDirection() {
    if (!this.directionsRenderer) {
      this.directionsRenderer = new google.maps.DirectionsRenderer();
    }
    const directionsRenderer = this.directionsRenderer;
    const directionsService = new google.maps.DirectionsService();
    // this.distance = this.calculateDistance(this.origin, this.destination);
    directionsService.route({
        origin: {
          lat: this.origin.latitude,
          lng: this.origin.longitude
        },
        destination: {
          lat: this.destination.latitude,
          lng: this.destination.longitude
        },
        travelMode: 'DRIVING'
      },
      (result, status) => {
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
            this.routeDetails = {
              distance: directionsData.distance,
              duration: directionsData.duration,
              startAddress: directionsData.start_address,
              endAddress: directionsData.end_address
            };
          }
        }
      });
  }

  destinationMarkers: Marker[] = [];
}

interface Marker {
  latitude: number;
  longitude: number;
  draggable?: boolean;
}

interface RouteDetails {
  distance: any;
  duration: any;
  startAddress: string;
  endAddress: string;
}

interface ILatLng {
  latitude: number;
  longitude: number;
}
