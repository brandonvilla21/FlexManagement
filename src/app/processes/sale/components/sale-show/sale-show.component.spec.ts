import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleShowComponent } from './sale-show.component';

describe('SaleShowComponent', () => {
  let component: SaleShowComponent;
  let fixture: ComponentFixture<SaleShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
