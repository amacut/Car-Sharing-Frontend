import { Component, OnInit } from '@angular/core';
import { LoginComponent} from '../login/login.component';
import {UserAccountComponent} from '../user-account/user-account.component';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import {faHistory} from '@fortawesome/free-solid-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';


import {faPercent} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faMap = faMapMarkedAlt;
  faHistory = faHistory;
  faCar = faCar;
  faUser = faUserCircle;
  faPriceList = faDollarSign;
  faInfo = faInfoCircle;
  faShare = faShareAlt;
  faConfig = faCog;
  faLogOut = faPowerOff;
  faPromo = faPercent;

  constructor(public loginComp: LoginComponent,
              public userAccount: UserAccountComponent) { }

  ngOnInit(): void {
  }

}
