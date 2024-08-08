import { TestBed } from '@angular/core/testing';

import { GetHumanResourceService } from './get-human-resource.service';

describe('GetHumanResourceService', () => {
  let service: GetHumanResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetHumanResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
