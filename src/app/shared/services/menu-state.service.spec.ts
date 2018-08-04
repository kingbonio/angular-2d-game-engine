import { TestBed, inject } from '@angular/core/testing';

import { MenuStateService } from './menu-state.service';

describe('MenuStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuStateService]
    });
  });

  it('should be created', inject([MenuStateService], (service: MenuStateService) => {
    expect(service).toBeTruthy();
  }));
});
