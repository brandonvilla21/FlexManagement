import { Component, OnInit } from '@angular/core';
import { PurchaseProductInterface } from './../models/purchase-product.model';
import { PurchaseProductService } from './../services/purchase-product.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {
  public purchases: any [];
  public search: string;
  constructor( private purchaseProductService: PurchaseProductService) {
    this.purchases = [];
    this.search = '';
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.purchaseProductService.general()
      .subscribe( purchases => this.purchases = purchases );
  }
}
