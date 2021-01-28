import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {RentalsService} from '../services/rentals.service';
import {CookieService} from 'ngx-cookie-service';
import {FortAwesomeService} from '../shared/fort-awesome/fort-awesome.service';

@Component({
  selector: 'app-rentals-history',
  templateUrl: './rentals-history.component.html',
  styleUrls: ['./rentals-history.component.css']
})
export class RentalsHistoryComponent implements OnInit {

  rentDetailsIsShow = false;
  rentalsList: Rental[] = [];
  /*  rentalsList: Rental[] = [
      {
        id: 1,
        rentDate: '2020-11-15 16:00:00',
        returnDate: '2020-11-15 18:00:00',
        drivingTime: '01:50:00',
        drivingPrice: 55.0,
        distance: 10.0,
        distancePrice: 8.0,
        stopOverTime: '00:10:00',
        stopOverPrice: 2.0,
        totalPrice: 65.0,
        isActive: false,
      },
      {
        id: 2,
        rentDate: '2020-11-16 16:00:00',
        returnDate: '2020-11-16 19:00:00',
        drivingTime: '02:50:00',
        drivingPrice: 55.0,
        distance: 10.0,
        distancePrice: 8.0,
        stopOverTime: '00:10:00',
        stopOverPrice: 2.0,
        totalPrice: 75.0,
        isActive: false,
      },
      {
        id: 3,
        rentDate: '2020-11-17 10:00:00',
        returnDate: '2020-11-17 14:00:00',
        drivingTime: '03:50:00',
        drivingPrice: 55.0,
        distance: 10.0,
        distancePrice: 8.0,
        stopOverTime: '00:10:00',
        stopOverPrice: 2.0,
        totalPrice: 85.0,
        isActive: false,
      }
    ];*/
  chosenRent: RentalDetails = null;

  constructor(private service: RentalsService,
              private cookies: CookieService,
              private icons: FortAwesomeService) {
  }

  ngOnInit(): void {
    this.getRentals();
  }

  carIcon = this.icons.faCar;
  private id = this.cookies.get('id');

  getRentals(): void {
    this.service.getAllRentals(this.id).subscribe(
      data => {
        console.log(data);
        this.rentalsList = data;
      }
    );
  }

  showDetails(index: number): void {
    console.log(index);
    this.service.getRentalsDetails(index).subscribe(
      data => {
        console.log('details' + data);
        this.chosenRent = data;
      }
    );
    document.querySelector('.modal-wrap').classList.add('active');
    document.querySelector('.app-content').classList.add('blur');
  }

  hideDetails(): void {
    document.querySelector('.modal-wrap').classList.remove('active');
    document.querySelector('.app-content').classList.remove('blur');
  }
}

interface Rental {
  id: number;
  vehicleId: number;
  rentDate: string;
  returnDate: string;
  totalPrice: number;
}

interface RentalDetails {
  id: number;
  rentDate: string;
  returnDate: string;
  drivingTime: string;
  drivingPrice: number;
  distance: number;
  distancePrice: number;
  stopOverTime: string;
  stopOverPrice: number;
  totalPrice: number;
  registration: string;
  brand: string;
  model: string;
  vehicleType: string;
  vehicleTypeDrivingPrice: number;
  vehicleTypeStopOverPrice: number;
  vehicleTypeDistancePrice: number;
}
