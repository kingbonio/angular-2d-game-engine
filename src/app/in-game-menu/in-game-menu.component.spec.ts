import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InGameMenuComponent } from './in-game-menu.component';

describe('InGameMenuComponent', () => {
  let component: InGameMenuComponent;
  let fixture: ComponentFixture<InGameMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InGameMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InGameMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
