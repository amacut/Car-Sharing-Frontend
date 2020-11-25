import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material/material.module';


import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MapComponent } from './map/map.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ConfigComponent } from './config/config.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    VehiclesComponent,
    ConfigComponent,
    PromotionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyCRuLGe61gWt6aIlwlHKgetiYdjP48relQ'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [VehiclesComponent]
})
export class AppModule { }
