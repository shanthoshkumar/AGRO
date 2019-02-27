import { TestBed, inject } from '@angular/core/testing';

import { ChainServiceService } from './chain-service.service';

describe('ChainServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChainServiceService]
    });
  });

  it('should be created', inject([ChainServiceService], (service: ChainServiceService) => {
    expect(service).toBeTruthy();
  }));
});
