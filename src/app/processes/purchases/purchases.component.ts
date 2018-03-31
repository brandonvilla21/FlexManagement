import { Component, OnInit } from '@angular/core';
import { PurchaseProductInterface } from './../models/purchase-product.model';
import { PurchaseProductService } from './../services/purchase-product.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

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

  downloadCSV() {
    
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      headers: Object.keys(this.purchases[0]),
      useBom: true
    };
   
     
    new Angular2Csv(this.purchases, 'Proceso de compras', options);
  }

}
