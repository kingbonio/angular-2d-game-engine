import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModalComponent } from './game-modal.component';

describe('GameModalComponent', () => {
  let component: GameModalComponent;
  let fixture: ComponentFixture<GameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
