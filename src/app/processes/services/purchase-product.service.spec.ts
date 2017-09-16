import { TestBed, inject } from '@angular/core/testing';

import { PurchaseProductService } from './purchase-product.service';

describe('PurchaseProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseProductService]
    });
  });

  it('should be created', inject([PurchaseProductService], (service: PurchaseProductService) => {
    expect(service).toBeTruthy();
  }));
});
