import { TestBed } from '@angular/core/testing';

import { GameSettingsService } from './game-settings.service';

describe('GameSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameSettingsService = TestBed.get(GameSettingsService);
    expect(service).toBeTruthy();
  });
});
