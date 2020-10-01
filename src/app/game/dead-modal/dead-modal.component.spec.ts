import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadModalComponent } from './dead-modal.component';

describe('DeadModalComponent', () => {
    let component: DeadModalComponent;
    let fixture: ComponentFixture<DeadModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeadModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeadModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
