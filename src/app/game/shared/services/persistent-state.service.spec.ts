import { TestBed, inject } from '@angular/core/testing';

import { PersistentStateService } from './persistent-state.service';

describe('PersistentStateService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PersistentStateService]
        });
    });

    it('should be created', inject([PersistentStateService], (service: PersistentStateService) => {
        expect(service).toBeTruthy();
    }));
});
