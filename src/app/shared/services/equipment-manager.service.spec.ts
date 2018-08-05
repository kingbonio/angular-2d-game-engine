import { TestBed, inject } from '@angular/core/testing';

import { EquipmentManagerService } from './equipment-manager.service';

describe('EquipmentManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentManagerService]
    });
  });

  it('should be created', inject([EquipmentManagerService], (service: EquipmentManagerService) => {
    expect(service).toBeTruthy();
  }));
});
