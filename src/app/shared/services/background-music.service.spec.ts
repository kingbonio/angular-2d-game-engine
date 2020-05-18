import { TestBed } from '@angular/core/testing';

import { BackgroundMusicService } from './background-music.service';

describe('BackgroundMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackgroundMusicService = TestBed.get(BackgroundMusicService);
    expect(service).toBeTruthy();
  });
});
