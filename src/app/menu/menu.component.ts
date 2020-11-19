import { Component, OnInit } from '@angular/core';
import { faCar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faCar = faCar;
  constructor() { }

  ngOnInit(): void {
  }

}
