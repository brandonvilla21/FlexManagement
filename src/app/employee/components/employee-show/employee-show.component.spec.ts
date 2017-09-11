import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeShowComponent } from './employee-show.component';

describe('EmployeeShowComponent', () => {
  let component: EmployeeShowComponent;
  let fixture: ComponentFixture<EmployeeShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
