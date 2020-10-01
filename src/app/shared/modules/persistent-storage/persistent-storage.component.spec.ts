import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersistentStorageComponent } from './persistent-storage.component';

describe('PersistentStorageComponent', () => {
    let component: PersistentStorageComponent;
    let fixture: ComponentFixture<PersistentStorageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PersistentStorageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersistentStorageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
