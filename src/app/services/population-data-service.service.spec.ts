import { TestBed } from '@angular/core/testing';

import { PopulationDataServiceService } from './population-data-service.service';

describe('PopulationDataServiceService', () => {
  let service: PopulationDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulationDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
