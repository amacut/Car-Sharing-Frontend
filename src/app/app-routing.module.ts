import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MapComponent} from './map/map.component';
import {PromotionsComponent} from './promotions/promotions.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'promotions',
    component: PromotionsComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
