import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseProductService } from './../services/purchase-product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  public id: string;
  public purchaseProduct: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private purchaseProductService: PurchaseProductService,
    private location: Location,
  ) {
    this.purchaseProduct = {};
    this.activatedRoute.params.subscribe( parameters => {
      this.id = parameters.id;
      this.purchaseProductService.findByIdJoin( this.id )
        .subscribe( res => { this.purchaseProduct = res; this.purchaseProduct.purchase_date.toLocaleString(); } );
    });
   }

  ngOnInit() {

  }
  goBack() {
    this.location.back();
  }
}
