import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentShowComponent } from './payment-show.component';

describe('PaymentShowComponent', () => {
  let component: PaymentShowComponent;
  let fixture: ComponentFixture<PaymentShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
