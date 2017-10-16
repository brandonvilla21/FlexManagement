import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleHistoryReportComponent } from './sale-history-report.component';

describe('SaleHistoryReportComponent', () => {
  let component: SaleHistoryReportComponent;
  let fixture: ComponentFixture<SaleHistoryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleHistoryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleHistoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
