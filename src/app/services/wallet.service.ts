import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  mainUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  public getUserWalletValue(id: string): Observable<number> {
    return this.http.get<number>(this.mainUrl + 'walletValue/' + id);
  }

  public creditsWallet(id: string, value: number, password: string): Observable<number> {
    return this.http.patch<number>(this.mainUrl + 'credits/' + id, {value, password});
  }

  public getWalletHistory(id: string): Observable<any> {
    return this.http.get<any>(this.mainUrl + 'history/' + id);
  }
}

