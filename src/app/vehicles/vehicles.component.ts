import {Component, OnInit} from '@angular/core';
import {VehiclesService} from '../services/vehicles.service';
import {Vehicle} from '../model/vehicle';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

import {DialogService} from '../services/dialog.service';
import {Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';
import {MapDestinationComponent} from '../map/map-destination/map-destination.component';
import {FortAwesomeService} from '../shared/fort-awesome/fort-awesome.service';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  providers: [VehiclesService],
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  public vehicle: Vehicle;
  fuelIcon = this.icons.faFuel;
  rangeIcon = this.icons.faRange;
  distanceIcon = this.icons.faDistance;

  constructor(private dialogRef: MatDialogRef<VehiclesComponent>,
              private dialogService: DialogService,
              private dialog: MatDialog,
              private notification: NotificationService,
              private router: Router,
              public icons: FortAwesomeService) {
  }

  ngOnInit(): void {
    this.vehicle = this.dialogRef._containerInstance._config.data.response;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  bookVehicle(): void {
    this.dialogService.openConfirmDialog('Czas rezerwacji samochodu to 1h (koszt 6 zł). Czy chcesz zarezerwować ten samochód?')
      .afterClosed().subscribe(res => {
      if (res) {
        console.log('Samochód zarezerwowany');
      }
    });
  }

  beginRent(): void {
    this.calculatePrice();

    console.log('Rozpoczęto wynajem');
  }

  showDirectionsToVehicle(): void {
    this.onClose();
    console.log('działa showDirectionsToVehicle');
    this.router.navigate(['/map'], {
      queryParams: {
        vehicleLatitude: this.vehicle.latitude,
        vehicleLongitude: this.vehicle.longitude,
        vehicleId: this.vehicle.id,
        travelMode: 'WALKING'
      }
    });
    console.log('Oto Twoja droga');
  }

  calculateRent(): void {
    this.calculatePrice();
    console.log('Wycena przejazdu');
  }


  calculatePrice() {
    this.onClose();
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



