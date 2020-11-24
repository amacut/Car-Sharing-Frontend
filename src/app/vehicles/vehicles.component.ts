import {Component, OnInit} from '@angular/core';
import {VehiclesService} from './vehicles.service';
import {VehicleResponseInterface} from './vehicleResponseInterface';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  providers: [VehiclesService],
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicle: VehicleResponseInterface[];

  constructor(private vehicleService: VehiclesService) {
  }

  ngOnInit(): void {
  }

  // getAllVehicles(): void {
  //   this.vehicleService.getVehicles()
  //     .subscribe(response => (this.vehicle = response));
  // }

  // tutaj wołać metody na komponencie mapy zeby tworzyć markery
}

