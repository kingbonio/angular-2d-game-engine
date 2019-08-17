import { TestBed } from '@angular/core/testing';

import { ApplicationStateService } from './application-state.service';

describe('ApplicationStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationStateService = TestBed.get(ApplicationStateService);
    expect(service).toBeTruthy();
  });
});
