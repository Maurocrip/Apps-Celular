import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { GlobalService } from '../servicios/global.service';

@Injectable({providedIn: 'root'})
export class AdminGuard 
{
  constructor(private global : GlobalService) {}
  
  canActivate() : boolean
  {
    return this.global.user == null;
  }
};
export const logueadoGuard: CanActivateFn = (route, state) => {
  return inject(AdminGuard).canActivate();
};
