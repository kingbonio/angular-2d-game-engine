import { TestBed, inject } from '@angular/core/testing';

import { PlayerStateService } from './player-state.service';

describe('PlayerStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerStateService]
    });
  });

  it('should be created', inject([PlayerStateService], (service: PlayerStateService) => {
    expect(service).toBeTruthy();
  }));
});
