import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesToPayReportComponent } from './sales-to-pay-report.component';

describe('SalesToPayReportComponent', () => {
  let component: SalesToPayReportComponent;
  let fixture: ComponentFixture<SalesToPayReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesToPayReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesToPayReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
