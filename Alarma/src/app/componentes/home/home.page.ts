import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErroresService } from 'src/app/servicios/errores.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { GlobalService } from 'src/app/servicios/global.service';
import { CapacitorFlash } from '@capgo/capacitor-flash';
import { Motion } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core/types/definitions';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  public modalOpen : boolean = false;
  public contra : string = "";
  private flagBibracion : boolean = true;
  private flagArriba : boolean = true;
  private flagDerecha : boolean = true;
  private flagIzquierda : boolean = true;
  private flagContra : boolean = true;
  private aceleracion? : PluginListenerHandle;
  public activado :boolean = false;

  constructor(private firebase : FirebaseService, private router : Router, private errores : ErroresService, private global : GlobalService) {}

  async LogOut()
  {
    const spiner = await this.global.getLoadingCtrl("dots");
    spiner.present();
    setTimeout(() => 
    {
      this.firebase.DesLogueo(this.firebase.auth)
      .then(async(res)=> 
        {
          this.global.email = null;
          this.global.user = null;
          this.errores.Generartost("Vuelva Pronto","success","green");
          this.router.navigate(['logIn']);
          spiner.dismiss();
        })
    }, 2000);
  }

  async Activar()
  {
    if(!this.activado)
    {
      this.activado = true;
      this.flagArriba = false;
      setTimeout(() => 
      {
        this.flagArriba = true;
      }, 500);
      this.aceleracion = await Motion.addListener('accel', event => 
      {
        if(event.acceleration.x>3 && this.flagDerecha)
        {
          this.flagDerecha = false;
          new Audio("../../../assets/audios/derecha.ogg").play();
          setTimeout(() => 
          {
            this.flagDerecha = true;
          }, 3000);
        }
        else if(event.acceleration.x<-3 && this.flagIzquierda)
        {
          this.flagIzquierda = false;
          new Audio("../../../assets/audios/izquierda.ogg").play();
          setTimeout(() => 
          {
            this.flagIzquierda = true;
          }, 3000);
        }
        else if(event.acceleration.z>2 && this.flagArriba)
        {
          this.flagArriba = false;
          CapacitorFlash.switchOn({intensity:100});
          new Audio("../../../assets/audios/vertical.ogg").play();
          setTimeout(() => 
            {
              this.flagArriba = true;
              CapacitorFlash.switchOff();
            }, 5000);
        }
        else if(screen.orientation.type.includes("landscape") && this.flagBibracion)
        {
          this.flagBibracion = false;
          Haptics.vibrate({duration:5000});
          new Audio("../../../assets/audios/horizontal.ogg").play();
          setTimeout(() => 
            {
              this.flagBibracion = true;
            }, 6000);
        }
      });
    }
    else if(this.flagContra)
    {
      this.modalOpen = true;
    }
  }

  Desactivar()
  {
    let mensaje = "Contraseña Incorrecta";
    let color = "red";
    let icono : any = "error";

    if(this.contra == this.global.password)
    {
      this.activado = false;
      this.aceleracion?.remove();
      mensaje = "Alarma desactivada";
      color = "green";
      icono = "success";
    }
    else
    {
      this.flagContra = false;
      CapacitorFlash.switchOn({intensity:100});
      new Audio("../../../assets/audios/contraIncorrecta.ogg").play();
      Haptics.vibrate({duration:5000})
      setTimeout(() => 
      {
        this.flagContra = true;
      }, 5000);
    }
    
    this.modalOpen = false;
    this.contra = "";
    this.errores.Generartost(mensaje,icono,color);
  }
}
