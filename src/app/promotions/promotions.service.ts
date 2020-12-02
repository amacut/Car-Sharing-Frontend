import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {PromotionsResponseInterface} from './promotionsResponseInterface';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  mainUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }
  getPromotions(): Observable<PromotionsResponseInterface[]> {
    return this.http.get<PromotionsResponseInterface[]>(this.mainUrl + 'promotions');
  }
}
