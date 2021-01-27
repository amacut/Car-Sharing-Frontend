import {ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WalletValueComponent} from '../wallet-value.component';
import {UserService} from '../../services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {WalletService} from '../../services/wallet.service';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.css']
})
export class WalletDetailsComponent implements OnInit {

  constructor(private service: WalletService,
              private cookie: CookieService) {
  }

  value: number;

  password: string;
  walletHistory: WalletHistory[] = [];
  private id = this.cookie.get('id');

  ngOnInit(): void {
    this.getWalletHistory();
  }

  creditWallet(): void {
    console.log(this.value + ' ' + this.password);
    this.service.creditsWallet(this.id, this.value, this.password).subscribe(
      data => {
        console.log(data + 'nowa kwota');
        // this.getWalletHistory();
        window.location.reload();
      }
    );
  }

  getWalletHistory(): void {
    console.log('pobieram historię');
    this.service.getWalletHistory(this.id).subscribe(
      data => {
        console.log(data);
        this.walletHistory = data;
      }
    );
  }
}

interface WalletHistory {
  id: number;
  transaction_date: string;
  type: string;
  value: number;
}
