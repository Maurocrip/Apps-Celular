import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Chat2PageRoutingModule } from './chat2-routing.module';

import { Chat2Page } from './chat2.page';
import { TiempoPipe } from 'src/app/pipe/tiempo.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Chat2PageRoutingModule,
    TiempoPipe
  ],
  declarations: [Chat2Page]
})
export class Chat2PageModule {}
