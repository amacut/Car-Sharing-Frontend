import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiUrlInterceptor} from './interceptors/api-url.interceptor';
import {MaterialModule} from './material/material.module';
import {DirectionsService} from './map/directions.service';
import {UserService} from './users/user.service';


import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MapComponent } from './map/map.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ConfigComponent } from './config/config.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AgmDirectionModule} from 'agm-direction';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserComponent } from './users/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    VehiclesComponent,
    ConfigComponent,
    PromotionsComponent,
    UserComponent,
    LoginComponent,
    AdminComponent,
    RegistrationComponent,
    LoginsuccessComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDGjd_7MqYeQzmQpI-13UtkCXSf48HXD_k',
      libraries: ['geometry']
    }),
    AgmDirectionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    // MatGridListModule,
    // MatInputModule
  ],
  providers: [
    DirectionsService,
    UserService,
    // {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [VehiclesComponent]
})
export class AppModule { }
