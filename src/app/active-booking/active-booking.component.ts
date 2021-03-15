import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../services/reservation.service';
import {CookieService} from 'ngx-cookie-service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-active-booking',
  templateUrl: './active-booking.component.html',
  styleUrls: ['./active-booking.component.css']
})
export class ActiveBookingComponent implements OnInit {

  constructor(private reservationService: ReservationService,
              private cookies: CookieService) {
  }

  userId = this.cookies.get('id');
  reservations: Reservations[] = [];

  ngOnInit(): void {
    this.getUserReservations();
  }

  getUserReservations(): Subscription {
    return this.reservationService.getReservations(this.userId).subscribe(
      data => {
        this.reservations = data;
      }
    );
  }


}

interface Reservations {
  id: number;
  startReservation: string;
  endReservation: string;
  registration: string;
  brand: string;
  model: string;
  vehicleType: string;
}
