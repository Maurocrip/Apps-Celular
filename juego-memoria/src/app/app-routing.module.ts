import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './componentes/splash/splash.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./componentes/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'logIn',
    pathMatch: 'full'
  },
  {
    path: 'logIn',
    component: LoginComponent
  },
  {
    path: 'Splash',
    component: SplashComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
