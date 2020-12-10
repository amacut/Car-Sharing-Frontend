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
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainPageComponent } from './mainpage/main-page.component';
import {CookieService} from 'ngx-cookie-service';
import {EnvServiceProvider} from './env.service.provider';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TrashComponent } from './trash/trash.component';




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
    RegistrationComponent,
    MainPageComponent,
    EditUserComponent,
    TrashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      // apiKey: EnvServiceFactory().apiUrl,
      libraries: ['geometry']
    }),
    AgmDirectionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    DirectionsService,
    UserService,
    CookieService,
    LoginComponent,
    UserService,
    EnvServiceProvider
    // {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [VehiclesComponent, EditUserComponent]
})
export class AppModule { }
