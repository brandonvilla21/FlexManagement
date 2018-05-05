import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostSelledProductsComponent } from './most-selled-products.component';

describe('MostSelledProductsComponent', () => {
  let component: MostSelledProductsComponent;
  let fixture: ComponentFixture<MostSelledProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostSelledProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostSelledProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
