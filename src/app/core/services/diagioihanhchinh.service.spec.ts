import { TestBed } from '@angular/core/testing';

import { DiagioihanhchinhService } from './diagioihanhchinh.service';

describe('DiagioihanhchinhService', () => {
  let service: DiagioihanhchinhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagioihanhchinhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
