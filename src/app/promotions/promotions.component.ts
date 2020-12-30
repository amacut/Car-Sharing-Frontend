import { Component, OnInit } from '@angular/core';
import {PromotionsService} from '../services/promotions.service';
import {PromotionInterface} from '../model/promotionInterface';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  promotion: PromotionInterface[];

  constructor(private promotionService: PromotionsService) { }

  ngOnInit(): void {
    this.getAllPromotions();
  }
  getAllPromotions(): void {
    this.promotionService.getPromotions()
      .subscribe(response => (this.promotion = response));
  }

}
