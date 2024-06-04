import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logueadoGuard } from './logueado.guard';

describe('logueadoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logueadoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
