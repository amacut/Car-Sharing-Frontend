import { Component, OnInit } from '@angular/core';
import {FortAwesomeService} from '../shared/fort-awesome/fort-awesome.service';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  walletIcon = this.icons.faWallet;
  userWalletValue = 0.0;
  constructor(public icons: FortAwesomeService,
              private userService: UserService,
              private cookie: CookieService) { }

  ngOnInit(): void {
    let id = this.cookie.get('id');
    this.userService.getUserWalletValue(id).subscribe(data => {
      this.userWalletValue = data;
    });
  }

}
