import { TestBed, async, inject } from '@angular/core/testing';

import { LogincheckGuard } from './logincheck.guard';

describe('LogincheckGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogincheckGuard]
    });
  });

  it('should ...', inject([LogincheckGuard], (guard: LogincheckGuard) => {
    expect(guard).toBeTruthy();
  }));
});
