import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Chat1PageRoutingModule } from './chat1-routing.module';

import { Chat1Page } from './chat1.page';
import { TiempoPipe } from 'src/app/pipe/tiempo.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Chat1PageRoutingModule,
    TiempoPipe
  ],
  declarations: [Chat1Page]
})
export class Chat1PageModule {}
