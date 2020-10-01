import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Movement } from './movement.component';

describe('MovementComponent', () => {
    let component: Movement;
    let fixture: ComponentFixture<Movement>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Movement]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Movement);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
