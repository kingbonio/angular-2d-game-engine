import { TestBed } from '@angular/core/testing';

import { AiService } from './ai.service';

describe('AiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AiService = TestBed.get(AiService);
    expect(service).toBeTruthy();
  });
});
