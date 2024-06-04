import { TestBed } from '@angular/core/testing';

import { LogueadoGuard } from './logueado.guard';

describe('LogueadoGuard', () => {
  let guard: LogueadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogueadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
