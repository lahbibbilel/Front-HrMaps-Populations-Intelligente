import { TestBed } from '@angular/core/testing';

import { ChartStatService } from './chart-stat.service';

describe('ChartStatService', () => {
  let service: ChartStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
