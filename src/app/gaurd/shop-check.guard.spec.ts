import { TestBed, async, inject } from '@angular/core/testing';

import { ShopCheckGuard } from './shop-check.guard';

describe('ShopCheckGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopCheckGuard]
    });
  });

  it('should ...', inject([ShopCheckGuard], (guard: ShopCheckGuard) => {
    expect(guard).toBeTruthy();
  }));
});
