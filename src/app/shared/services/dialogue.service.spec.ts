import { TestBed, inject } from '@angular/core/testing';

import { DialogueService } from './dialogue.service';

describe('DialogueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogueService]
    });
  });

  it('should be created', inject([DialogueService], (service: DialogueService) => {
    expect(service).toBeTruthy();
  }));
});
