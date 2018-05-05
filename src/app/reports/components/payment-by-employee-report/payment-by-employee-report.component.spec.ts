import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentByEmployeeReportComponent } from './payment-by-employee-report.component';

describe('PaymentByEmployeeReportComponent', () => {
  let component: PaymentByEmployeeReportComponent;
  let fixture: ComponentFixture<PaymentByEmployeeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentByEmployeeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentByEmployeeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
