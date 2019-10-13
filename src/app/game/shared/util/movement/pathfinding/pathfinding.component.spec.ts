import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfindingComponent } from './pathfinding.component';

describe('PathfindingComponent', () => {
  let component: PathfindingComponent;
  let fixture: ComponentFixture<PathfindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
