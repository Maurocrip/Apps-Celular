import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { JuegoComponent } from '../juego/juego.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabla',
    pathMatch: 'full'
  },
  {
    path: 'tabla',
    component: HomePage
  },
  {
    path: 'Juego',
    component: JuegoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
