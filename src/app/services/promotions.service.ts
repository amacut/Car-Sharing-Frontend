import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {PromotionInterface} from '../model/promotionInterface';


@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  mainUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }
  getPromotions(): Observable<PromotionInterface[]> {
    return this.http.get<PromotionInterface[]>(this.mainUrl + 'promotions');
  }
}
