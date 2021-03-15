import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DialogService} from './dialog.service';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from './notification.service';
import {Router} from '@angular/router';
import {FortAwesomeService} from '../shared/fort-awesome/fort-awesome.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient,
              private notification: NotificationService,
              private router: Router,
              private cookie: CookieService) {
  }

  mainUrl = 'http://localhost:8080/';
  reservation: Reservation;

  reservationVehicle(time: number, vehicle: any): void {
    console.log(time + 'samochód ' + vehicle);
    if (time > 0) {
      const notificationMsg = 'Samochód '
        + vehicle.vehicleBrand + ' ' + vehicle.vehicleModel + ' został zarezerwowany na ' + time;
      if (time === 1) {
        this.notification.reservationInfo(notificationMsg + ' godzinę');
      } else if (time % 10 === 2 || time % 10 === 3 || time % 10 === 4) {
        this.notification.reservationInfo(notificationMsg + ' godziny');
      } else {
        this.notification.reservationInfo(notificationMsg + ' godzin');
      }
      this.reservation = {
        userId: this.cookie.get('id'),
        vehicleId: vehicle.id,
        reservationTime: time
      };
      this.addNewReservation(this.reservation).subscribe();
      document.querySelector('.modal-reservation').classList.remove('active');
      this.router.navigateByUrl('/refresh').then(() => {
        setTimeout(() => {
          this.router.navigate(['/mainpage']);
        }, 2000);
      });
    }
  }

  cancelActiveReservation(vehicle: any): void {
    this.reservation = {
      userId: this.cookie.get('id'),
      vehicleId: vehicle.id
    };
    this.cancelReservation(this.reservation).subscribe();
    this.notification.reservationInfo( 'Rezerwacja samochodu ' + vehicle.vehicleBrand + ' ' + vehicle.vehicleModel + ' została anulowana.');
    this.router.navigateByUrl('/refresh').then(() => {
      setTimeout(() => {
        this.router.navigate(['/mainpage']);
      }, 2000);
    });
  }

  getReservations(id: string): Observable<any> {
    return this.http.get<any>(this.mainUrl + 'reservations/' + id);
  }

  addNewReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.mainUrl + 'newReservation', reservation);
  }

  cancelReservation(reservation: any): Observable<any> {
    return this.http.patch<any>(this.mainUrl + 'cancelReservation', reservation);
  }
}

interface Reservation {
  userId: any;
  vehicleId: any;
  reservationTime?: number;
}
