import { TestBed, inject } from '@angular/core/testing';

import { GameStateService } from './game-state.service';

describe('StateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameStateService]
    });
  });

  it('should be created', inject([GameStateService], (service: GameStateService) => {
    expect(service).toBeTruthy();
  }));
});
