import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { SplashComponent } from './componentes/splash/splash.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'logIn',
    pathMatch: 'full'
  },
  {
    path: 'Sala',
    loadChildren: () => import('./componentes/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'logIn',
    component: LoginComponent,
  },
  {
    path: 'Splash',
    component: SplashComponent
  },
  {
    path: 'chat2',
    loadChildren: () => import('./componentes/chat2/chat2.module').then( m => m.Chat2PageModule)
  },
  {
    path: 'chat1',
    loadChildren: () => import('./componentes/chat1/chat1.module').then( m => m.Chat1PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
