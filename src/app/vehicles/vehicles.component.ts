import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {VehiclesService} from '../services/vehicles.service';
import {Vehicle} from '../model/vehicle';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../services/dialog.service';
import {Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';
import {FortAwesomeService} from '../shared/fort-awesome/fort-awesome.service';
import {ReservationService} from '../services/reservation.service';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  providers: [VehiclesService],
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  @Input()
  vehicle: Vehicle;

  fuelIcon = this.icons.faFuel;
  rangeIcon = this.icons.faRange;
  distanceIcon = this.icons.faDistance;
  time: number;
  reservation: Reservation;

  constructor(private dialogService: DialogService,
              private dialog: MatDialog,
              private notification: NotificationService,
              private router: Router,
              public icons: FortAwesomeService,
              public reservationService: ReservationService,
              private cookie: CookieService) {
  }



  ngOnInit(): void {

  }

  bookVehicle(): void {
    document.querySelector('.modal-reservation').classList.add('active');
  }

  hideReservationModal(): void {
    document.querySelector('.modal-reservation').classList.remove('active');
  }

  reservationVehicle(): void {
    if (this.time > 0) {
      const notificationMsg = 'Samochód '
        + this.vehicle.vehicleBrand + ' ' + this.vehicle.vehicleModel + ' został zarezerwowany na ' + this.time;
      if (this.time === 1) {
        this.notification.reservationInfo(notificationMsg + ' godzinę');
      } else if (this.time % 10 === 2 || this.time % 10 === 3 || this.time % 10 === 4) {
        this.notification.reservationInfo(notificationMsg + ' godziny');
      } else {
        this.notification.reservationInfo(notificationMsg + ' godzin');
      }
      this.reservation = {
        userId: this.cookie.get('id'),
        vehicleId: this.vehicle.id,
        reservationTime: this.time
      };
      this.reservationService.addNewReservation(this.reservation).subscribe();
      document.querySelector('.modal-reservation').classList.remove('active');
      this.router.navigateByUrl('/refresh').then(() => {
        setTimeout(() => {
          this.router.navigate(['/mainpage']);
        }, 2000);
      });
    }
  }

  cancelReservation(): void {
    this.reservationService.cancelActiveReservation(this.vehicle);
    document.querySelector('.modal-wrap').classList.remove('active');
  }

  beginRent(): void {
    this.calculatePrice();
  }

  showDirectionsToVehicle(): void {
    this.router.navigate(['/map'], {
      queryParams: {
        vehicleLatitude: this.vehicle.latitude,
        vehicleLongitude: this.vehicle.longitude,
        vehicleId: this.vehicle.id,
        travelMode: 'WALKING'
      }
    });
  }

  calculateRent(): void {
    this.calculatePrice();
  }


  calculatePrice(): void {
    this.router.navigate(['/map'], {
      queryParams: {
        vehicleLatitude: this.vehicle.latitude,
        vehicleLongitude: this.vehicle.longitude,
        vehicleId: this.vehicle.id,
        travelMode: 'DRIVING'
      }
    });
    this.notification.info('Wskaż na mapie cel podróży');
  }
}

interface Reservation {
  userId: any;
  vehicleId: any;
  reservationTime?: number;
}



