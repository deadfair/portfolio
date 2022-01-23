import { TestBed } from '@angular/core/testing';

import { ElementRefService } from './element-ref.service';

describe('ElementRefService', () => {
  let service: ElementRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
