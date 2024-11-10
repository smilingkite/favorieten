import { TestBed } from '@angular/core/testing';

import { FavorietService } from './favoriet.service';

describe('FavorietService', () => {
  let service: FavorietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavorietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
