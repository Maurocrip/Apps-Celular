import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErroresService } from 'src/app/servicios/errores.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { GlobalService } from 'src/app/servicios/global.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public isSupported = false;
  public barcodes: Barcode[] = [];
  public resultado : any = "0";

  constructor(private firebase : FirebaseService, private router : Router, private errores : ErroresService, private global : GlobalService) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async LogOut()
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
          this.errores.Generartost("Vuelva Pronto","success","green");
          this.router.navigate(['logIn']);
          spiner.dismiss();
        })
    }, 2000);
  }


  Pasar(numero : number)
  {
    this.router.navigate(['Sala/chat'+numero]);
  }

}
