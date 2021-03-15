import { Injectable } from '@angular/core';

import {faBars, faWallet} from '@fortawesome/free-solid-svg-icons';
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

import {faGasPump} from '@fortawesome/free-solid-svg-icons';
import {faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {faRoute} from '@fortawesome/free-solid-svg-icons';

import {faTimes} from '@fortawesome/free-solid-svg-icons';

import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import {faSort} from '@fortawesome/free-solid-svg-icons';
import {faAdjust} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class FortAwesomeService {
  // Menu icons
  faBars = faBars;
  faWallet = faWallet;
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
  // Vehicle icons
  faFuel = faGasPump;
  faRange = faTachometerAlt;
  faDistance = faRoute;
  // Edit-user icons
  exit = faTimes;
  // back icon
  back = faArrowLeft;
  faSort = faSort;
  faAdjust = faAdjust;
  constructor() { }
}
