import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCreateComponent } from './purchase-create.component';

describe('PurchaseComponent', () => {
  let component: PurchaseCreateComponent;
  let fixture: ComponentFixture<PurchaseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});