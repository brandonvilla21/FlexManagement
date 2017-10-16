import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListReportComponent } from './product-list-report.component';

describe('ProductListReportComponent', () => {
  let component: ProductListReportComponent;
  let fixture: ComponentFixture<ProductListReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
