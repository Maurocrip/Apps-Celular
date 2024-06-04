import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErroresService } from 'src/app/servicios/errores.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { GlobalService } from 'src/app/servicios/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public arrayOpcion : Array<any> = [
    {path:"../../../assets/tema/Colores/rojo.png", opcion: "rojo"},
    {path:"../../../assets/tema/Colores/azul.png", opcion: "azul"},
    {path:"../../../assets/tema/Colores/amarillo.png", opcion: "amarillo"},
    {path:"../../../assets/tema/Colores/naranja.png", opcion: "naranja"},
    {path:"../../../assets/tema/Colores/negro.png", opcion: "negro"},
    {path:"../../../assets/tema/Colores/violeta.png", opcion: "violeta"}
  ]
  private idioma : string = "castellano";
  public temaPathBoton : string = "../../../assets/tema/colores.png";
  public idiomaPathBoton : string = "../../../assets/Banderas/Mexico.png";

  constructor(private firebase : FirebaseService, private router : Router, private errores : ErroresService, private global : GlobalService) {}

  async LogOut()
  {
    const spiner = await this.global.getLoadingCtrl("dots");
    spiner.present()
    setTimeout(() => 
    {
      try
      {
        this.firebase.DesLogueo(this.firebase.auth)
        .then(async(res)=> 
        {
          this.global.email = null;
          this.global.user = null;
          this.errores.Generartost("Vuelva Pronto","success","green");
          this.router.navigate(['login']);
          spiner.dismiss();
        })
      }
      catch(error: any)  
      {
        console.log(error);
        this.errores.MostrarError(error.code)
      };
    }, 2000);
  }

  Tema(tema:string)
  {
    switch(tema)
    {
      case "color":
        this.temaPathBoton = "../../../assets/tema/colores.png";
        this.arrayOpcion = [
          {path:"../../../assets/tema/Colores/rojo.png", opcion: "rojo"},
          {path:"../../../assets/tema/Colores/azul.png", opcion: "azul"},
          {path:"../../../assets/tema/Colores/amarillo.png", opcion: "amarillo"},
          {path:"../../../assets/tema/Colores/naranja.png", opcion: "naranja"},
          {path:"../../../assets/tema/Colores/negro.png", opcion: "negro"},
          {path:"../../../assets/tema/Colores/violeta.png", opcion: "violeta"}
        ]

      break;
      case "annimal":
        this.temaPathBoton = "../../../assets/tema/cerdo.png";
        this.arrayOpcion = [
          {path:"../../../assets/tema/animales/pez.png", opcion: "pez"},
          {path:"../../../assets/tema/animales/perro.png", opcion: "perro"},
          {path:"../../../assets/tema/animales/gato.png", opcion: "gato"},
          {path:"../../../assets/tema/animales/caballo.png", opcion: "caballo"},
          {path:"../../../assets/tema/animales/pajaro.png", opcion: "pajaro"},
          {path:"../../../assets/tema/animales/cerdo.png", opcion: "cerdo"}
        ]
      break;
      case "numero":
        this.temaPathBoton = "../../../assets/tema/numeros.png";
        this.arrayOpcion =
        [
          {path:"../../../assets/tema/numeros/1.png", opcion: "1"},
          {path:"../../../assets/tema/numeros/2.png", opcion: "2"},
          {path:"../../../assets/tema/numeros/3.png", opcion: "3"},
          {path:"../../../assets/tema/numeros/4.png", opcion: "4"},
          {path:"../../../assets/tema/numeros/5.png", opcion: "5"},
          {path:"../../../assets/tema/numeros/6.png", opcion: "6"}
        ]
      break;
    }
  }

  Idioma(idioma:string)
  {
    switch(idioma)
    {
      case "castellano":
        this.idiomaPathBoton ="../../../assets/Banderas/Mexico.png"
      break;
      case "brasilero":
        this.idiomaPathBoton ="../../../assets/Banderas/brasil.png"
      break;
      case "ingles":
        this.idiomaPathBoton ="../../../assets/Banderas/EstadosUnidos.png"
      break;
    }
    this.idioma = idioma;
  }

  Sonido(nombre : string)
  {
    let audio = new Audio("../../../assets/"+this.idioma+"/"+nombre+".ogg");

    audio.play()
  }
}
