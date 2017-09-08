import { TestBed, inject } from '@angular/core/testing';

import { ConfigUrlService } from './config.url.service';

describe('ConfigUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigUrlService]
    });
  });

  it('should be created', inject([ConfigUrlService], (service: ConfigUrlService) => {
    expect(service).toBeTruthy();
  }));
});
