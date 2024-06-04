import { Injectable } from '@angular/core';
import { LoadingController, SpinnerTypes } from '@ionic/angular';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { ErroresService } from './errores.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GlobalService 
{
  public arrayUsuario : Array<any> =[];
  public arrayFotosLindas : Array<any> =[];
  public arrayFotosFeas : Array<any> =[];
  public email : string|null = null;
  public user : string|null = null;
  alertController: any;
  constructor(private loadingCtrl: LoadingController, private firebase :FirebaseService,private router: Router, private error : ErroresService) 
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

    this.firebase.getAllSnapshot("lindas","Day","Hora","desc").subscribe((res)=>
    {
      this.arrayFotosLindas = [...res];
    })

    this.firebase.getAllSnapshot("feas","Day","Hora","desc").subscribe((res)=>
    {
      this.arrayFotosFeas = [...res];
    })

  }

  public async LogOut()
  {
    Swal.fire({
      title: 'Seguro queres cerrar secion?',
      text: "no es reversible!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Quiero irme!',
      heightAuto: false
    })
    .then(async (result) => 
    {
      if (result.isConfirmed) 
      {
        const spiner = await this.getLoadingCtrl("dots");
        spiner.present();
        try
        {
          this.firebase.DesLogueo(this.firebase.auth)
          .then(async(res)=> 
          {
            setTimeout(()=>{
              this.error.Generartost("Lo extrañeremos, vuelva Pronto","success","green");
              this.email = null;
              this.user = null;
              this.router.navigate(["logIn"])
              spiner.dismiss();
              console.log(res);
            },2000)
          })
        }
        catch(error: any)  
        {
          console.log(error);
          this.error.MostrarError(error.code)
        };
      }
    })
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
