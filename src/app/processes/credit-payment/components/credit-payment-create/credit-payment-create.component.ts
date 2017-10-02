import { SaleProductInterface } from './../../../sale/models/sale-product.model';
import { SaleProductService } from './../../../sale/services/sale-product.service';
import { Customer } from './../../../../customer/customer.model';
import { SearchModalComponent } from './../../../../shared/search-modal/search-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-payment-create',
  templateUrl: './credit-payment-create.component.html',
  styleUrls: ['./credit-payment-create.component.scss'],
  providers: [
    SaleProductService
  ]
})
export class CreditPaymentCreateComponent implements OnInit {
  public customer: Customer = {
    customer_id: '',
    name: '',
    lastname: '',
    reference: '',
    whatsapp: '',
    facebook: '',
    balance: 0
  }
  public saleSelected: SaleProductInterface = {
    sale_id: '',
    customer_id: '',
    employee_id: '',
    sale_date: new Date(),
    type: '',
    state: '',
    subtotal: 0,
    discount: 0,
    total: 0,
    total_payment: 0,
    product_saleProduct: [],
  }
  public salesProduct: SaleProductInterface[] = [];

  constructor(
    private dialogService: DialogService,
    private saleProductService: SaleProductService
  ) { }

  ngOnInit() {
  }
  setSale( saleProduct: SaleProductInterface ) {
    this.saleSelected = saleProduct;
  }
  getBalance() {
    this.saleProductService.findByColumn( 'customer_id', this.customer.customer_id )
      .subscribe( res => {
        this.salesProduct = res;
      })
  }
  details( saleProduct: SaleProductInterface ) {
    // this.dialogService.addDialog(SaleDetailModalComponent, {
    //   saleProduct: saleProduct
    // });
  }
  showModalSearch( type: string, title: string) {
    this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title
    }).subscribe( data => {
      if ( data ) {
        switch ( type ) {
          case 'customer':
            this.customer = data;
            this.getBalance();
            break;

        }
      }
    })
  }

}
