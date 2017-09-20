import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCreateComponent } from './sale-create.component';

describe('SaleCreateComponent', () => {
  let component: SaleCreateComponent;
  let fixture: ComponentFixture<SaleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
