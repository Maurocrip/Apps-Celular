import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { SplashComponent } from './componentes/splash/splash.component';
import { logueadoGuard } from './guards/logueado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'logIn',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./componentes/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'logIn',
    component: LoginComponent,
    canActivate: [logueadoGuard]
  },
  {
    path: 'Splash',
    component: SplashComponent
  },
  {
    path: 'graficos',
    loadChildren: () => import('./componentes/graficos/graficos.module').then( m => m.GraficosPageModule)
  },
  {
    path: 'MisFotos',
    loadChildren: () => import('./componentes/mis-fotos/mis-fotos.module').then( m => m.MisFotosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
