import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'chat1',
    loadChildren: () => import('../chat1/chat1.module').then( m => m.Chat1PageModule)
  },
  {
    path: 'chat2',
    loadChildren: () => import('../chat2/chat2.module').then( m => m.Chat2PageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
