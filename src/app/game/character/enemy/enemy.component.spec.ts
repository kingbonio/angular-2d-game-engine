import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyComponent } from './enemy.component';

describe('EnemyComponent', () => {
  let component: EnemyComponent;
  let fixture: ComponentFixture<EnemyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnemyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
