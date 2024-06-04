import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ListaComponent } from '../lista/lista.component';
import { FotosComponent } from '../fotos/fotos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ListaComponent, FotosComponent],
  exports:[ListaComponent, FotosComponent]
})
export class HomePageModule {}
