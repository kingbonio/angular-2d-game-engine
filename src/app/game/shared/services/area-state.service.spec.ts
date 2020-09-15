import { TestBed, inject } from '@angular/core/testing';

import { AreaStateService } from './area-state.service';

describe('AreaStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [AreaStateService]
    });
  });

  it('should be created', inject([AreaStateService], (service: AreaStateService) => {
    expect(service).toBeTruthy();
  }));
});
