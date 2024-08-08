import { TestBed } from '@angular/core/testing';

import { GetHelpdeskService } from './get-helpdesk.service';

describe('GetHelpdeskService', () => {
  let service: GetHelpdeskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetHelpdeskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
