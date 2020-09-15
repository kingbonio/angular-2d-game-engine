import { TestBed, inject } from '@angular/core/testing';

import { BattleCalculatorService } from './battle-calculator.service';

describe('BattleCalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [BattleCalculatorService]
    });
  });

  it('should be created', inject([BattleCalculatorService], (service: BattleCalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
