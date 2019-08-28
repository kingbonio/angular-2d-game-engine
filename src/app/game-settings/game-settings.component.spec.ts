import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSettingsComponent } from './game-settings.component';

describe('GameSettingsComponent', () => {
  let component: GameSettingsComponent;
  let fixture: ComponentFixture<GameSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
