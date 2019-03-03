import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleCalculatorComponent } from './battle-calculator.component';

describe('BattleCalculatorComponent', () => {
  let component: BattleCalculatorComponent;
  let fixture: ComponentFixture<BattleCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
