import { TestBed } from '@angular/core/testing';

import { PopulationServiceService } from './population-service.service';

describe('PopulationServiceService', () => {
  let service: PopulationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
