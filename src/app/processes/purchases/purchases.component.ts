import { PurchaseProductInterface } from './../purchase-product.model';
import { PurchaseProductService } from './../services/purchase-product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {
  public purchases: PurchaseProductInterface [];

  constructor( private purchaseProductService: PurchaseProductService ) {
    this.purchases = [];
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.purchaseProductService.all()
      .subscribe( purchases => this.purchases = purchases );
  }

}
