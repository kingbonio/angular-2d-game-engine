import { TestBed, inject } from '@angular/core/testing';

import { AreaConfigProviderService } from './area-config-provider.service';

describe('AreaConfigProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [AreaConfigProviderService]
    });
  });

  it('should be created', inject([AreaConfigProviderService], (service: AreaConfigProviderService) => {
    expect(service).toBeTruthy();
  }));
});
