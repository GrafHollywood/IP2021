import { TestBed } from '@angular/core/testing';

import { HttpDbService } from './http-db.service';

describe('HttpDbService', () => {
  let service: HttpDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
