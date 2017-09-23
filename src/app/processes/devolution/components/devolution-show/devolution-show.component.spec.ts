import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolutionShowComponent } from './devolution-show.component';

describe('DevolutionShowComponent', () => {
  let component: DevolutionShowComponent;
  let fixture: ComponentFixture<DevolutionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolutionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolutionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
