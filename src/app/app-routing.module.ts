import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {MainPageComponent} from './mainpage/main-page.component';

import {PromotionsComponent} from './promotions/promotions.component';
import {SettingsComponent} from './settings/settings.component';
import {RentalsHistoryComponent} from './rentals-history/rentals-history.component';
import {ActiveBookingComponent} from './active-booking/active-booking.component';
import {PriceListComponent} from './price-list/price-list.component';
import {GuidesComponent} from './guides/guides.component';
import {MapDestinationComponent} from './map/map-destination/map-destination.component';
import {UserAccountDetailsComponent} from './user-account-details/user-account-details.component';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'mainpage',
    component: MainPageComponent,
  },
  {
    path: 'map',
    component: MapDestinationComponent
  },
  {
    path: 'rentals-history',
    component: RentalsHistoryComponent
  },
  {
    path: 'active-booking',
    component: ActiveBookingComponent
  },
  {
    path: 'account',
    component: UserAccountDetailsComponent
  },
  {
    path: 'price-list',
    component: PriceListComponent
  },
  {
    path: 'FAQ&Guides',
    component: GuidesComponent
  },
  {
    path: 'promotions',
    component: PromotionsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
