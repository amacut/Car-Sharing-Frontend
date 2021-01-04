import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {FortAwesomeService} from '../../shared/fort-awesome/fort-awesome.service';
import {NotificationService} from '../../services/notification.service';

declare var google: any;

@Component({
  selector: 'app-map-destination',
  templateUrl: './map-destination.component.html',
  styleUrls: ['./map-destination.component.css']
})
export class MapDestinationComponent implements OnInit {

  startPosition: any = {
    latitude: 0,
    longitude: 0
  };
  zoom = 16;
  origin: any;
  destination: any;
  private directionsRenderer: any;
  routeDetails: RouteDetails;
  selectedRoute: boolean;

  constructor(private route: ActivatedRoute,
              private mapsAPILoader: MapsAPILoader,
              private gMapsApi: GoogleMapsAPIWrapper,
              private icons: FortAwesomeService,
              private notification: NotificationService) {
  }

  back = this.icons.back;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.startPosition = {
        latitude: parseFloat(params['vehicleLatitude']),
        longitude: parseFloat(params['vehicleLongitude'])
      };
    });
  }

  changeView(): string {
    return this.selectedRoute === true ? '65.6%' : '100%';
  }

  mapClicked(event): void {
    const latitude = event.coords.lat;
    const longitude = event.coords.lng;
    this.origin = {
      lat: this.startPosition.latitude,
      lng: this.startPosition.longitude
    };
    this.destination = {
      lat: latitude,
      lng: longitude
    };
    if (this.origin.lat && this.origin.lng && this.destination.lat && this.destination.lng) {
      this.getDirection(this.origin.lat, this.origin.lng, this.destination.lat, this.destination.lng);
      this.changeSelectedRoute();
    }
  }

  changeSelectedRoute(): void {
    this.notification.info('Ładowanie danych...');
    setTimeout(() => {
      this.selectedRoute = true;
      this.notification.snackBar.dismiss();
    }, 2000);
  }

  getDirection(originLat: number, originLng: number, destinationLat: number, destinationLng: number): void {
    if (!this.directionsRenderer) {
      this.directionsRenderer = new google.maps.DirectionsRenderer();
    }
    const directionsRenderer = this.directionsRenderer;
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
        origin: {
          lat: originLat,
          lng: originLng
        },
        destination: {
          lat: destinationLat,
          lng: destinationLng
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
              distance: directionsData.distance.text,
              duration: directionsData.duration.text,
              startAddress: directionsData.start_address,
              endAddress: directionsData.end_address
            };
          }
        }
      });
  }
}
interface RouteDetails {
  distance: string;
  duration: string;
  startAddress: string;
  endAddress: string;
}
