import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolutionCreateComponent } from './devolution-create.component';

describe('DevolutionCreateComponent', () => {
  let component: DevolutionCreateComponent;
  let fixture: ComponentFixture<DevolutionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolutionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolutionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
