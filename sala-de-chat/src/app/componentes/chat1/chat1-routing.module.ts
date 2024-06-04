import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Chat1Page } from './chat1.page';

const routes: Routes = [
  {
    path: '',
    component: Chat1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Chat1PageRoutingModule {}
