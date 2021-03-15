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

  constructor(private service: RentalsService,
              private cookies: CookieService,
              private icons: FortAwesomeService) {
  }

  rentDetailsIsShow = false;
  rentalsList: Rental[] = [];

  chosenRent: RentalDetails = null;

  carIcon = this.icons.faCar;
  sortIcon = this.icons.faSort;
  detailsIcon = this.icons.faInfo;
  private id = this.cookies.get('id');
  key = 'id';
  p = 1;
  reverse = true;
  ngOnInit(): void {
    this.getRentals();
  }

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
  sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
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
