import { TestBed, inject } from '@angular/core/testing';

import { InventoryManagerService } from './inventory-manager.service';

describe('Inventory.ManagerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [InventoryManagerService]
        });
    });

    it('should be created', inject([InventoryManagerService], (service: InventoryManagerService) => {
        expect(service).toBeTruthy();
    }));
});
