import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@angular/fire/storage';
import { ErroresService } from 'src/app/servicios/errores.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { GlobalService } from 'src/app/servicios/global.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{

  public path : any = "";
  public formato = '';

  constructor(public global: GlobalService, private firebase :FirebaseService, private router: Router, private error : ErroresService, private alertController: AlertController,private storage : Storage) {}
  ngOnInit()
  {
    Camera.requestPermissions();
  }
  
  async TomarFoto(adjetivo : string)
  {
    let image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    const spiner = await this.global.getLoadingCtrl("dots");
    spiner.present()

    let hoy = new Date();
    let fecha = hoy.getDate()+"/"+hoy.getMonth()+"/"+hoy.getFullYear();
    let hora = hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds();

    let pathStorage = await this.GuardarImagen(image.base64String,"fotos/"+ adjetivo +"/"+this.global.user+ Date.now()+"."+ image.format, this.storage);
    if(pathStorage)
    {
      if(adjetivo=="feas")
      {
        this.firebase.GuardarFotoFea(this.global.user!,pathStorage!,fecha,hora);
      }
      else
      {
        this.firebase.GuardarFotoLinda(this.global.user!,pathStorage!,fecha,hora);
      }
      spiner.dismiss();
      this.formato = adjetivo;
    }
    
  }

  async GuardarImagen(foto : any, path : string, storage : any)
  {
    let blod = this.dataUrlToBlob(foto);
    const imagReferencia = ref(storage, path);
    return uploadBytes(imagReferencia, blod)
    .then(()=>
    {
      return getDownloadURL(imagReferencia);
    })
    .catch((error)=>
    {
      console.log(error);
    });
  }

  private dataUrlToBlob(base64String: string): Blob {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' }); // Cambia el tipo MIME según tu necesidad
}
}


