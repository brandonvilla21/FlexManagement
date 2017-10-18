import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHistoryReportComponent } from './purchase-history-report.component';

describe('PurchaseHistoryReportComponent', () => {
  let component: PurchaseHistoryReportComponent;
  let fixture: ComponentFixture<PurchaseHistoryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseHistoryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseHistoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
