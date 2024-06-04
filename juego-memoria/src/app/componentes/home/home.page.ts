import { AfterViewInit, Component, ElementRef } from '@angular/core';
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

  public currentIndex = 0;
  public arrayFacil : Array<any> = [];
  public arrayMedio : Array<any> = [];
  public arrayDificil : Array<any> = [];

  constructor(public global: GlobalService, private firebase :FirebaseService, private router: Router, private error : ErroresService) 
  {
    this.firebase.ObtenerColeccionConCondicion("facil").subscribe((res)=>
    {
      this.arrayFacil = [...res]
      this.Ordenar(this.arrayFacil);
    })
    this.firebase.ObtenerColeccionConCondicion("medio").subscribe((res)=>
    {
      this.arrayMedio = [...res]
      this.Ordenar(this.arrayMedio);
    })
    this.firebase.ObtenerColeccionConCondicion("dificil").subscribe((res)=>
    {
      this.arrayDificil = [...res]
      this.Ordenar(this.arrayDificil);
    })
  }


  async LogOut()
  {
    Swal.fire({
      title: "Estas seguro de cerrar sesión?",
      text: "Una vez confirmado se cerrara la sesión, si cancela no pasara nada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Quiero cerrar sesión",
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.CerrarSecion();
      }
    });
  }

  private async CerrarSecion()
  {
    const spiner = await this.global.getLoadingCtrl("dots");
    spiner.present()
    setTimeout(() => 
    {
      this.firebase.DesLogueo(this.firebase.auth)
      .then(async(res)=> 
        {
          this.global.email = null;
          this.global.user = null;
          this.error.Generartost("Vuelva Pronto","success","green");
          this.router.navigate(['logIn']);
          spiner.dismiss();
        })
    }, 2000);
  }

  Empezar(dificultad : string)
  {
    this.global.dificultad = dificultad;
    this.router.navigate(['home/Juego']);
  }

  private Ordenar(array: Array<any>) 
  {
    for (let i = 0; i < array.length; i++) 
    {
      let miliPrimero = array[i].Tiempo;
      for (let j = i + 1; j < array.length; j++) {
          let result = miliPrimero - array[j].Tiempo;
          if (result > 0) {
              [array[i], array[j]] = [array[j], array[i]]; // Intercambiar los elementos
              miliPrimero = array[i].Tiempo; // Actualizar el valor de miliPrimero
          }
      }
    }
}
//------------------------------CARRUSEL------------------------------------------------------------

  public nextSlide() 
  {
    const slides = document.querySelectorAll('.table-slide');

    if (this.currentIndex < slides.length - 1) {
      this.currentIndex++;
    }
  }

  public prevSlide() 
  {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}


