import { Component, OnInit } from '@angular/core';
import {PromotionsResponseInterface} from './promotionsResponseInterface';
import {PromotionsService} from './promotions.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  promotion: PromotionsResponseInterface[];

  constructor(private promotionService: PromotionsService) { }

  ngOnInit(): void {
    this.getAllPromotions();
  }
  getAllPromotions(): void {
    this.promotionService.getPromotions()
      .subscribe(response => (this.promotion = response));
  }

}
