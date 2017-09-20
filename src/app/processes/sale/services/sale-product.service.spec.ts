import { TestBed, inject } from '@angular/core/testing';

import { SaleProductService } from './sale-product.service';

describe('SaleProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaleProductService]
    });
  });

  it('should be created', inject([SaleProductService], (service: SaleProductService) => {
    expect(service).toBeTruthy();
  }));
});
