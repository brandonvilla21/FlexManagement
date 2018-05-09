import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingProductsComponent } from './missing-products.component';

describe('MissingProductsComponent', () => {
  let component: MissingProductsComponent;
  let fixture: ComponentFixture<MissingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
