import { ElementRef, Injectable } from '@angular/core';
import { LoadingController, SpinnerTypes } from '@ionic/angular';
import { FirebaseService } from './firebase.service';
import { CollectionReference, DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public arrayUsuario : Array<any> =[];
  public email : string|null = null;
  public user : string|null = "mauro";
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

  public Guardar(colection : CollectionReference<DocumentData, DocumentData>, textArea : HTMLButtonElement)
  {
    let hoy = new Date();
    let fecha = hoy.getDate()+"/"+hoy.getMonth()+"/"+hoy.getFullYear();
    this.firebase.GuardarMensaje(textArea.value,this.user!,colection,Date.now(), fecha);
    textArea.value = ""
  }

  public scrollToBottom(scroll: ElementRef<any>) {
    setTimeout(() => {
      if (scroll) {
        scroll.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  private convertirAFechaCompleta(evento: any): Date {
    const [dia, mes, año] = evento.Fecha.split('/').map(Number);
    const fecha = new Date(año, mes - 1, dia);
    fecha.setMilliseconds(evento.Hora);
    return fecha;
  }

  public ordenar(a: any, b: any): number 
  {
    const fechaA = this.convertirAFechaCompleta(a);
    const fechaB = this.convertirAFechaCompleta(b);
    return fechaA.getTime() - fechaB.getTime();
  }
}
