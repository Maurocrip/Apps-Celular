import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { JuegoComponent } from '../juego/juego.component';
import { TeimpoPipe } from 'src/app/pipe/teimpo.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TeimpoPipe
  ],
  declarations: [HomePage, JuegoComponent]
})
export class HomePageModule {}
