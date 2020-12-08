import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';

import {MenuComponent} from './menu/menu.component';
import {RegistrationComponent} from './registration/registration.component';
import {MainPageComponent} from './mainpage/main-page.component';
import {UserAccountComponent} from './user-account/user-account.component';

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
    path: 'user/mainpage',
    component: MainPageComponent
  },
  {
    path: 'user/account',
    component: UserAccountComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
