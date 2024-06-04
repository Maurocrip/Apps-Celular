import { Injectable } from '@angular/core';
import { LoadingController, SpinnerTypes } from '@ionic/angular';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService 
{
  public dificultad : string = "";
  public arrayUsuario : Array<any> =[];
  public arrayFacilCartas : Array<any> =[];
  public arrayDificilCartas : Array<any> =[];
  public arrayMedioCartas : Array<any> =[];
  public email : string|null = null;
  public user : string|null = null;
  constructor(private loadingCtrl: LoadingController, private firebase :FirebaseService) 
  {
    this.firebase.TraerUsuario()
    .subscribe((res)=>
    {
      this.arrayUsuario =[];
      for(let element of res)
      {     
        this.arrayUsuario.push({Email :element["Email"], Usuario :  element["Usuario"]});   
      }
    })

    this.arrayFacilCartas = 
    [
      {path: "../../../assets/cartas/facil/vaca.jpeg", valor:"vaca", select: false},
      {path: "../../../assets/cartas/facil/perro.jpeg", valor:"perro", select: false},
      {path: "../../../assets/cartas/facil/gato.jpeg", valor:"gato", select: false},
      {path: "../../../assets/cartas/facil/vaca.jpeg", valor:"vaca", select: false},
      {path: "../../../assets/cartas/facil/perro.jpeg", valor:"perro", select: false},
      {path: "../../../assets/cartas/facil/gato.jpeg", valor:"gato", select: false},
    ]
    this.arrayMedioCartas = 
    [
      {path: "../../../assets/cartas/medio/destornillador.png", valor:"destornillador", select: false},
      {path: "../../../assets/cartas/medio/llameInglesa.png", valor:"llameInglesa", select: false},
      {path: "../../../assets/cartas/medio/masa.png", valor:"masa", select: false},
      {path: "../../../assets/cartas/medio/nivel.png", valor:"nivel", select: false},
      {path: "../../../assets/cartas/medio/sierra.png", valor:"sierra", select: false},
      {path: "../../../assets/cartas/medio/destornillador.png", valor:"destornillador", select: false},
      {path: "../../../assets/cartas/medio/llameInglesa.png", valor:"llameInglesa", select: false},
      {path: "../../../assets/cartas/medio/masa.png", valor:"masa", select: false},
      {path: "../../../assets/cartas/medio/nivel.png", valor:"nivel", select: false},
      {path: "../../../assets/cartas/medio/sierra.png", valor:"sierra", select: false},
    ]
    this.arrayDificilCartas =
    [
      {path: "../../../assets/cartas/dificil/banana.png", valor:"banana", select: false},
      {path: "../../../assets/cartas/dificil/ceresa.png", valor:"ceresa", select: false},
      {path: "../../../assets/cartas/dificil/frutilla.png", valor:"frutilla", select: false},
      {path: "../../../assets/cartas/dificil/limon.png", valor:"limon", select: false},
      {path: "../../../assets/cartas/dificil/naranja.png", valor:"naranja", select: false},
      {path: "../../../assets/cartas/dificil/pera.png", valor:"pera", select: false},
      {path: "../../../assets/cartas/dificil/piña.png", valor:"piña", select: false},
      {path: "../../../assets/cartas/dificil/sandia.png", valor:"sandia", select: false},
      {path: "../../../assets/cartas/dificil/banana.png", valor:"banana", select: false},
      {path: "../../../assets/cartas/dificil/ceresa.png", valor:"ceresa", select: false},
      {path: "../../../assets/cartas/dificil/frutilla.png", valor:"frutilla", select: false},
      {path: "../../../assets/cartas/dificil/limon.png", valor:"limon", select: false},
      {path: "../../../assets/cartas/dificil/naranja.png", valor:"naranja", select: false},
      {path: "../../../assets/cartas/dificil/pera.png", valor:"pera", select: false},
      {path: "../../../assets/cartas/dificil/piña.png", valor:"piña", select: false},
      {path: "../../../assets/cartas/dificil/sandia.png", valor:"sandia", select: false},
    ]
  }

  public getLoadingCtrl(spinnerName : SpinnerTypes, message? : string, duration? : number, cssClass? : string)
  {
    return this.loadingCtrl.create(
    {
      spinner: spinnerName,
      duration: duration,
      message: message,
      cssClass: cssClass
    }
    )
  }
  
}
