import { Component, OnInit } from '@angular/core';
import { SaleProductInterface } from '../../models/sale-product.model';
import { SaleProductService } from './../../services/sale-product.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  public sales: any [];
  public search: string;
  constructor( private saleProductService: SaleProductService) {
    this.sales = [];
    this.search = '';
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.saleProductService.general()
      .subscribe(sales => this.sales = sales );
  }

}
