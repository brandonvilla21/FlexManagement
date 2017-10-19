import { ReportsService } from './../../services/reports.service';
import { Customer } from './../../../customer/customer.model';
import { DialogService } from 'ng2-bootstrap-modal';
import { SearchModalComponent } from './../../../shared/search-modal/search-modal.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-status',
  templateUrl: './account-status.component.html',
  styleUrls: ['./account-status.component.scss']
})
export class AccountStatusComponent implements OnInit {
  public customer: Customer;
  public stateType: any;
  public year: any;
  public accountState: any;
  public years: any;
  public tableData: any;
  constructor(
    private dialogService: DialogService,
    private reportService: ReportsService
  ) {
    this.customer = {
      customer_id: '',
      name: '',
      lastname: '',
      reference: '',
      whatsapp: '',
      facebook: '',
      balance: 0
    }
    this.accountState = [
      { value: 'ALL', option: 'Todas'},
      { value: 'DEBT', option: 'Ventas en deuda'},
      { value: 'SETTLED', option: 'Ventas liquidadas'}
    ]
    this.stateType = this.accountState[0].value;
    this.years = [
      { value: '2017-01-01', option: '2017'},
      { value: '2018-01-01', option: '2018'}
    ]
    this.year = this.years[0].value;
  }

  ngOnInit() {
  }

  showModalSearch( type: string, title: string) {
    this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title
    })
    .flatMap( data => {
      if ( data ) {
        this.customer = data;
        return this.reportService.accountStatus(
        this.stateType, this.year, this.customer.customer_id)
      }
    })
    .subscribe( res => this.tableData = res )
  }
  setStateType( value ) {
    this.stateType = value;
  }
  setYear( value ) {
    this.year = value;
  }
  fillTable() {

  }


}
