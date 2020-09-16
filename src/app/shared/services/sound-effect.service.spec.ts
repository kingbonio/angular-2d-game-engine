import { TestBed } from '@angular/core/testing';

import { AudioService } from '../../servieces/audio.service';

describe('AudioService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AudioService = TestBed.get(AudioService);
        expect(service).toBeTruthy();
    });
});
