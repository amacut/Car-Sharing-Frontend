import {Component, OnInit} from '@angular/core';
import {VehiclesService} from './vehicles.service';
import {VehicleResponseInterface} from './vehicleResponseInterface';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  providers: [VehiclesService],
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicle: VehicleResponseInterface[];

  constructor(public vehicleService: VehiclesService,
              private dialogRef: MatDialogRef<VehiclesComponent>) {
  }

  ngOnInit(): void {
    this.getAllVehicles();
  }
  onClose() {
    this.dialogRef.close();
  }

  getAllVehicles(): void {
    this.vehicleService.getVehicles()
      .subscribe(response => (this.vehicle = response));
  }

  // tutaj wołać metody na komponencie mapy zeby tworzyć markery
}


