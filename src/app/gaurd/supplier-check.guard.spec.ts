import { TestBed, async, inject } from '@angular/core/testing';

import { SupplierCheckGuard } from './supplier-check.guard';

describe('SupplierCheckGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierCheckGuard]
    });
  });

  it('should ...', inject([SupplierCheckGuard], (guard: SupplierCheckGuard) => {
    expect(guard).toBeTruthy();
  }));
});
