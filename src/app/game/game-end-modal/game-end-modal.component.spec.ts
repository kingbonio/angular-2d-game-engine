import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEndModalComponent } from './game-end-modal.component';

describe('GameEndComponent', () => {
  let component: GameEndModalComponent;
  let fixture: ComponentFixture<GameEndModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameEndModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEndModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
