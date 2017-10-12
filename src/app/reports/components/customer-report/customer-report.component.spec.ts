import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReportComponent } from './customer-report.component';

describe('CustomerReportComponent', () => {
  let component: CustomerReportComponent;
  let fixture: ComponentFixture<CustomerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
