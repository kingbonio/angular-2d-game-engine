import { TestBed } from '@angular/core/testing';

import { AssetLoaderService } from './asset-loader.service';

describe('AssetLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetLoaderService = TestBed.get(AssetLoaderService);
    expect(service).toBeTruthy();
  });
});
