import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';



import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MapComponent } from './map/map.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyCRuLGe61gWt6aIlwlHKgetiYdjP48relQ'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
