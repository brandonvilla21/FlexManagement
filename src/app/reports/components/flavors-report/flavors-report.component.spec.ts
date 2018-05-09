import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorsReportComponent } from './flavors-report.component';

describe('FlavorsReportComponent', () => {
  let component: FlavorsReportComponent;
  let fixture: ComponentFixture<FlavorsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavorsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
