import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './componentes/login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"juegodidactico-43c67","appId":"1:142149212560:web:9a63a04d192d274a273b15","storageBucket":"juegodidactico-43c67.appspot.com","apiKey":"AIzaSyCLTxVLnGhQ4y-laeWrngFUC7raJ3ddSEY","authDomain":"juegodidactico-43c67.firebaseapp.com","messagingSenderId":"142149212560"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
