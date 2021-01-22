import {Component, OnInit, Renderer2} from '@angular/core';
import { LoginComponent} from '../login/login.component';

import {FortAwesomeService} from '../shared/fort-awesome/fort-awesome.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuIcon = this.icons.faBars;
  walletIcon = this.icons.faWallet;
  mapIcon = this.icons.faMap;
  historyIcon = this.icons.faHistory;
  carIcon = this.icons.faCar;
  userIcon = this.icons.faUser;
  priceListIcon = this.icons.faPriceList;
  infoIcon = this.icons.faInfo;
  shareIcon = this.icons.faShare;
  configIcon = this.icons.faConfig;
  logOutIcon = this.icons.faLogOut;
  promoIcon = this.icons.faPromo;


  constructor(public loginComp: LoginComponent,
              public icons: FortAwesomeService,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {

  }

  toggleMenu(): void {
    console.log('dziala');
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
  }
}
