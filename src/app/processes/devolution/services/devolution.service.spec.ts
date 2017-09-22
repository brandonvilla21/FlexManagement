import { TestBed, inject } from '@angular/core/testing';

import { DevolutionService } from './devolution.service';

describe('DevolutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevolutionService]
    });
  });

  it('should be created', inject([DevolutionService], (service: DevolutionService) => {
    expect(service).toBeTruthy();
  }));
});
