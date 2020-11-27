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
  public vehicles: VehicleResponseInterface[];
  public vehicle: VehicleResponseInterface;

  constructor(public vehicleService: VehiclesService,
              private dialogRef: MatDialogRef<VehiclesComponent>) {
  }

  ngOnInit(): void {
    this.vehicle = this.dialogRef._containerInstance._config.data.response;
  }
  onClose() {
    this.dialogRef.close();
  }

  /*getAllVehicles(): void {
    this.vehicleService.getVehicles()
      .subscribe(response => (this.vehicles = response));
  }*/
  /*getVehicle(id: number): void {
    this.vehicleService.getVehicle(id).subscribe(response => {
      this.vehicle = response;
    });
  }*/

}



