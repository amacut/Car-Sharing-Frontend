import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FortAwesomeService} from '../shared/fort-awesome/fort-awesome.service';
import {CookieService} from 'ngx-cookie-service';
import {WalletService} from '../services/wallet.service';

@Component({
  selector: 'app-wallet-value',
  templateUrl: './wallet-value.component.html'
})
export class WalletValueComponent implements OnInit {

  // @Input()
  walletValue: number;


  constructor(public icons: FortAwesomeService,
              private service: WalletService,
              private cookie: CookieService) {
  }

  ngOnInit(): void {
    this.getWalletValue();
  }

  getWalletValue(): void {
    const id = this.cookie.get('id');
    this.service.getUserWalletValue(id).subscribe(
      data => {
        this.walletValue = data;
      });
  }

}
