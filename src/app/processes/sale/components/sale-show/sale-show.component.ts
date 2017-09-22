import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { SaleProductInterface } from '../../models/sale-product.model';
import { SaleProductService } from './../../services/sale-product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sale-show',
  templateUrl: './sale-show.component.html',
  styleUrls: ['./sale-show.component.scss']
})
export class SaleShowComponent implements OnInit {

  public saleProductId: string;
  public saleProduct: SaleProductInterface;

  constructor(
    private saleProductService: SaleProductService,
    private activatedRoute: ActivatedRoute
   ){ }

  ngOnInit() {
    this.getSale();
  }

  getSale() {
    this.activatedRoute.params.subscribe(parameters => {
      this.saleProductId = parameters['id'];
      this.saleProductService.findByIdJoin(this.saleProductId).subscribe(saleProduct => {
        this.saleProduct = saleProduct;
      });
    });
  }
}
