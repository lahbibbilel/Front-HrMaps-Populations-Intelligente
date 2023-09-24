import { TestBed } from '@angular/core/testing';

import { CollaboratorDataServiceService } from './collaborator-data-service.service';

describe('CollaboratorDataServiceService', () => {
  let service: CollaboratorDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollaboratorDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
