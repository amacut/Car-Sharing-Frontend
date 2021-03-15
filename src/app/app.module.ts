import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiUrlInterceptor} from './interceptors/api-url.interceptor';
import {MaterialModule} from './shared/material/material.module';
import {UserService} from './services/user.service';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {MapComponent} from './map/map.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {VehiclesComponent} from './vehicles/vehicles.component';
import {ConfigComponent} from './config/config.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmDirectionModule} from 'agm-direction';
import {MatFormFieldModule} from '@angular/material/form-field';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainPageComponent} from './mainpage/main-page.component';
import {CookieService} from 'ngx-cookie-service';
import {EnvServiceFactory, EnvServiceProvider} from './env.service.provider';
import {EditUserComponent} from './edit-user/edit-user.component';
import {DatePipe} from '@angular/common';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {RentalsHistoryComponent} from './rentals-history/rentals-history.component';
import {ActiveBookingComponent} from './active-booking/active-booking.component';
import {PriceListComponent} from './price-list/price-list.component';
import {GuidesComponent} from './guides/guides.component';
import {GoogleMapsModule} from '@angular/google-maps';
import {MapDestinationComponent} from './map/map-destination/map-destination.component';
import {MatDialogRef} from '@angular/material/dialog';
import {UserAccountDetailsComponent} from './user-account-details/user-account-details.component';
import { WalletValueComponent } from './wallet/wallet-value.component';
import { WalletDetailsComponent } from './wallet/wallet-details/wallet-details.component';
import { RefreshComponent } from './refresh/refresh.component';
import { Ng2OrderModule} from 'ng2-order-pipe';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    VehiclesComponent,
    ConfigComponent,
    PromotionsComponent,
    UserAccountDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    MainPageComponent,
    EditUserComponent,
    ConfirmDialogComponent,
    RentalsHistoryComponent,
    ActiveBookingComponent,
    PriceListComponent,
    GuidesComponent,
    MapDestinationComponent,
    WalletValueComponent,
    WalletDetailsComponent,
    RefreshComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: EnvServiceFactory().apiUrl,
      libraries: ['geometry', 'places']
    }),
    AgmDirectionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    GoogleMapsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  providers: [
    UserService,
    CookieService,
    LoginComponent,
    UserService,
    DatePipe,
    MapDestinationComponent,
    VehiclesComponent,
    MapComponent,
    GoogleMapsAPIWrapper,
    EnvServiceProvider
    // {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [VehiclesComponent, EditUserComponent, ConfirmDialogComponent]
})
export class AppModule {
}
