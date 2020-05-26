import { TestBed, async, inject } from '@angular/core/testing';

import { GameGuard } from './game.guard';

describe('GameGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameGuard]
    });
  });

  it('should ...', inject([GameGuard], (guard: GameGuard) => {
    expect(guard).toBeTruthy();
  }));
});
