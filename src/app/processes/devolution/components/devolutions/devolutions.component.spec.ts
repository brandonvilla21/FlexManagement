import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolutionsComponent } from './devolutions.component';

describe('DevolutionsComponent', () => {
  let component: DevolutionsComponent;
  let fixture: ComponentFixture<DevolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
