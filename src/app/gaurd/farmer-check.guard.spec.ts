import { TestBed, async, inject } from '@angular/core/testing';

import { FarmerCheckGuard } from './farmer-check.guard';

describe('FarmerCheckGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmerCheckGuard]
    });
  });

  it('should ...', inject([FarmerCheckGuard], (guard: FarmerCheckGuard) => {
    expect(guard).toBeTruthy();
  }));
});
