import { Injectable } from '@angular/core';
import { LoadingController, SpinnerTypes } from '@ionic/angular';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService 
{
  public arrayUsuario : Array<any> =[];
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
