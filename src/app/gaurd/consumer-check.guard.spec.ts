import { TestBed, async, inject } from '@angular/core/testing';

import { ConsumerCheckGuard } from './consumer-check.guard';

describe('ConsumerCheckGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsumerCheckGuard]
    });
  });

  it('should ...', inject([ConsumerCheckGuard], (guard: ConsumerCheckGuard) => {
    expect(guard).toBeTruthy();
  }));
});
