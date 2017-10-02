import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPaymentCreateComponent } from './credit-payment-create.component';

describe('CreditPaymentCreateComponent', () => {
  let component: CreditPaymentCreateComponent;
  let fixture: ComponentFixture<CreditPaymentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditPaymentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditPaymentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
