import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LootingModalComponent } from './looting-modal.component';

describe('LootingComponent', () => {
    let component: LootingModalComponent;
    let fixture: ComponentFixture<LootingModalComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [LootingModalComponent]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(LootingModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});
