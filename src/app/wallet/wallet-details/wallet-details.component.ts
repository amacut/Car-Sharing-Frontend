import {Component, OnInit, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {WalletService} from '../../services/wallet.service';
import {Router} from '@angular/router';
import {FortAwesomeService} from '../../shared/fort-awesome/fort-awesome.service';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.css']
})
export class WalletDetailsComponent implements OnInit {

  constructor(private service: WalletService,
              private cookie: CookieService,
              private router: Router,
              private icons: FortAwesomeService) {
  }
  sortIcon = this.icons.faSort;
  value: number;
  key = 'id';
  p = 1;
  reverse = true;
  transactionType: any;
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
        // this.getWalletHistory();
        // window.location.reload();
        // this.ngOnInit();
        this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/wallet']);
        });

      }
    );
  }

  getWalletHistory(): void {
    console.log('pobieram historię');
    this.service.getWalletHistory(this.id).subscribe(
      data => {
        this.walletHistory = data;
      }
    );
  }

  search() {
    if (this.transactionType == '') {
      this.ngOnInit();
    }
    else {
      this.walletHistory = this.walletHistory.filter(res => {
        return res.type.toLocaleLowerCase().match(this.transactionType.toLocaleLowerCase());
      });
    }
  }

  sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
  }
}

interface WalletHistory {
  id: number;
  transaction_date: string;
  type: string;
  value: number;
}
