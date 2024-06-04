import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ErroresService } from 'src/app/servicios/errores.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { GlobalService } from 'src/app/servicios/global.service';


@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.page.html',
  styleUrls: ['./mis-fotos.page.scss'],
})
export class MisFotosPage implements OnInit{

  private flag1 : boolean = false
  private flag2 : boolean = false
  public arrayFotosLindas : Array<any> = [];
  public arrayFotosFeas : Array<any> = [];

  constructor(public global: GlobalService, private firebase :FirebaseService, private router: Router,private errores : ErroresService) {}

  ngOnInit(): void 
  {
    this.firebase.ObtenerColecccionConCondicion("lindas","Usuario",this.global.user).subscribe((res)=>
    {
      this.arrayFotosLindas = [...res];
      this.SinFotos();
      this.flag1 = true;
    })
      
    this.firebase.ObtenerColecccionConCondicion("feas","Usuario",this.global.user).subscribe((res)=>
    {
      this.arrayFotosFeas = [...res];
      this.SinFotos();
      this.flag2 = true; 
    })
  }

  private async SinFotos()
  {
    if(this.arrayFotosLindas.length<=0 && this.arrayFotosFeas.length<=0 && this.flag1 == this.flag2)
    {
      this.errores.GenerarAlerta("Debes de subir alguna foto primero", "error", "NO TIENES FOTOS");
      this.router.navigate(['home']);
    }
  }
}
