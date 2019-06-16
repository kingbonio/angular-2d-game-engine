import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LootingComponent } from './looting.component';

describe('LootingComponent', () => {
  let component: LootingComponent;
  let fixture: ComponentFixture<LootingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LootingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LootingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
