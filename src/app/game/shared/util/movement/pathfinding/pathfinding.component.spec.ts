import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pathfinding } from './pathfinding.component';

describe('PathfindingComponent', () => {
    let component: Pathfinding;
    let fixture: ComponentFixture<Pathfinding>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Pathfinding]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Pathfinding);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
