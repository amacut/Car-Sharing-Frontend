import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {FortAwesomeService} from '../../shared/fort-awesome/fort-awesome.service';
import {NotificationService} from '../../services/notification.service';
import {RentalsService} from '../../services/rentals.service';
import {Rental} from '../../model/rental';
import {CookieService} from 'ngx-cookie-service';
import {VehiclesService} from '../../services/vehicles.service';
import {AppComponent} from '../../app.component';
import {VehiclesComponent} from '../../vehicles/vehicles.component';
import {Vehicle} from '../../model/vehicle';
import {ReservationService} from '../../services/reservation.service';

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
  vehicleId = 0;
  zoom = 16;
  origin: any;
  destination: any;
  travelMode: string;
  stopOverTime = 0;
  private directionsRenderer: any;
  routeDetails: RouteDetails;
  routeToVehicle: RouteToVehicle;
  selectedRoute: boolean;
  private newRental: Rental;
  vehicle: Vehicle;
  time: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private mapsAPILoader: MapsAPILoader,
              private gMapsApi: GoogleMapsAPIWrapper,
              private icons: FortAwesomeService,
              private notification: NotificationService,
              private rentalService: RentalsService,
              private cookies: CookieService,
              private vehicleService: VehiclesService,
              private mainComponent: AppComponent,
              public reservationService: ReservationService) {
  }

  userPosition = this.mainComponent.userPosition;
  back = this.icons.back;
  vehicleIcon = this.icons.faCar;
  userId = this.cookies.get('id');

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.startPosition = {
        latitude: parseFloat(params['vehicleLatitude']),
        longitude: parseFloat(params['vehicleLongitude'])
      };
      this.vehicleId = parseInt(params['vehicleId']);
      this.travelMode = params['travelMode'];
    });
    this.vehicleService.getVehicle(this.vehicleId).subscribe(
      response => {
        this.vehicle = response;
      }
    );
    if (this.travelMode === 'WALKING') {
      this.showRouteToVehicle();
    }
  }
  bookVehicle(): void {
    document.querySelector('.modal-reservation').classList.add('active');
  }

  hideReservationModal(): void {
    document.querySelector('.modal-reservation').classList.remove('active');
  }

  changeView(): string {
    return this.selectedRoute === true ? '65.6%' : '100%';
  }

  mapClicked(event): void {
    if (this.travelMode === 'DRIVING') {
      this.selectedRoute = false;
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
  }

  changeSelectedRoute(): void {
    this.notification.success('Ładowanie danych...');
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
        travelMode: this.travelMode,
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
            if (this.travelMode === 'DRIVING') {
              console.log('getRoute DRIVING');
              this.rentalService.getRoutePrice(this.vehicleId, directionsData.distance.value,
                directionsData.duration.value, this.stopOverTime)
                .subscribe(
                  data => {
                    this.routeDetails = {
                      distanceText: directionsData.distance.text,
                      durationText: directionsData.duration.text,
                      distance: directionsData.distance.value,
                      duration: directionsData.duration.value,
                      startAddress: directionsData.start_address,
                      endAddress: directionsData.end_address,
                      totalPrice: data
                    };
                  }
                );
            }
            if (this.travelMode === 'WALKING') {
              this.routeToVehicle = {
                distanceText: directionsData.distance.text,
                durationText: directionsData.duration.text,
                startAddress: directionsData.start_address,
                endAddress: directionsData.end_address,
              };
            }
          }
        }
      });
  }

  showRouteToVehicle(): void {
    this.origin = {
      lat: this.userPosition.latitude,
      lng: this.userPosition.longitude
    };
    this.destination = {
      lat: this.startPosition.latitude,
      lng: this.startPosition.longitude
    };
    this.getDirection(this.origin.lat, this.origin.lng, this.destination.lat, this.destination.lng);
    this.changeSelectedRoute();
  }

  beginRent(): void {
    this.newRental = {
      userId: this.userId,
      origin: this.routeDetails.startAddress,
      destination: this.routeDetails.endAddress,
      drivingTime: this.routeDetails.duration,
      distance: this.routeDetails.distance,
      stopOverTime: this.stopOverTime,
      vehicleId: this.vehicleId,
      latitude: this.destination.lat,
      longitude: this.destination.lng
    };

    this.rentalService.addNewRental(this.newRental).subscribe();
    // this.vehicleService.changeVehiclePosition(this.vehicleId, this.destination.lat, this.destination.lng).subscribe();
    this.cookies.set('userPosition', 'true');
    this.cookies.set('userPositionLat', this.destination.lat);
    this.cookies.set('userPositionLng', this.destination.lng);
    this.notification.success('Trwa symulacja podróży...');
    setTimeout(() => {
      this.router.navigate(['/mainpage'], {
        queryParams: {
          newUserLatitude: this.destination.lat,
          newUserLongitude: this.destination.lng,
        }
      });
    }, 3000);
  }
}

interface RouteDetails {
  distanceText: string;
  durationText: string;
  distance: number;
  duration: number;
  startAddress: string;
  endAddress: string;
  totalPrice: number;
}

interface RouteToVehicle {
  distanceText: string;
  durationText: string;
  startAddress: string;
  endAddress: string;
}
