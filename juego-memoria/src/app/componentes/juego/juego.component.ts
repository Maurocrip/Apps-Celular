import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/servicios/global.service';
import { ErroresService } from 'src/app/servicios/errores.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { CollectionReference, DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss'],
})
export class JuegoComponent implements OnInit

{
  public background : string = ""
  private coleccion : any = "";
  public clase : string = "";
  private millisecondsInicio: number = 0;
  private CantidadParesEncontrados = 0;
  public dorso :string = "";
  private valorGuardado : string = "";
  private idGuardado : number = -1;
  private botonGuardado : any = {};
  public arrayCartas : Array<any>  = [];

  constructor( private router: Router, public global : GlobalService, private error : ErroresService, private firebase :FirebaseService) {}
  ngOnInit(): void 
  {
    this.arrayCartas = [];
    switch(this.global.dificultad)
    {
      case "facil":
        this.Preparar(this.global.arrayFacilCartas,"buttonFacil","../../../assets/cartas/facil/dorsoFacil.png",this.firebase.colTeimposFacil, "#250057" );
      break;
      case "medio":
        this.Preparar(this.global.arrayMedioCartas,"buttonMedio","../../../assets/cartas/medio/dorsoMedio.png",this.firebase.colTeimposMedio, "#b72f44");
      break;
      case "dificil":
        this.Preparar(this.global.arrayDificilCartas,"buttonDificil","../../../assets/cartas/dificil/dorsoDificil.png",this.firebase.colTeimposDificil, "#005500");
      break;
    }
    this.Ordenar();
    this.millisecondsInicio =  Date.now();
  }

  Confirmar(carta : any, id : number)
  {
    this.DisabledTodos(true);
    this.arrayCartas[id].select = true;
    let boton = document.getElementById(id.toString()) as HTMLButtonElement ;
    boton.disabled = true;

    if(this.idGuardado<0)
    {
      this.valorGuardado = carta.valor;
      this.idGuardado = id;
      this.botonGuardado = boton;
      this.DisabledExepto(id)
    }
    else
    {
      if(carta.valor == this.valorGuardado)
      {
        let idCom = this.idGuardado;
        this.CantidadParesEncontrados++;
        this.valorGuardado = "";
        this.idGuardado  = -1;
        this.botonGuardado  = {};
        this.DisabledExepto(id,idCom)
      }
      else
      {
        setTimeout(()=>
        {
          this.arrayCartas[id].select = false;
          this.arrayCartas[this.idGuardado].select = false;
          this.botonGuardado.disabled = false;
          boton.disabled = false;
          this.valorGuardado = "";
          this.idGuardado  = -1;
          this.botonGuardado  = {};
          this.DisabledTodos(false);
        },500)
      }
    }
    if(this.CantidadParesEncontrados== this.arrayCartas.length/2)
    {
      this.Terminar()
    }
  }

  private Terminar() {
    let tiempo = Date.now()- this.millisecondsInicio;
    this.firebase.GuardarTiempo(this.coleccion,tiempo,this.global.user!)
    this.error.GenerarAlerta("tu tiempo fue " + this.convertSecondsToTime(tiempo),"success","Has ganado");
    this.router.navigate(['home']);
  }

  private convertSecondsToTime(milliseconds: number): string {
    let hours: number = Math.floor(milliseconds / 3600000);
    let minutes: number = Math.floor((milliseconds % 3600000) / 60000);
    let seconds: number = Math.floor((milliseconds % 60000) / 1000);
    let remainingMilliseconds: number = milliseconds % 1000;

    return `${hours.toString()}:${minutes.toString()}:${seconds.toString()}:${remainingMilliseconds.toString()}`;
  }

  private DisabledTodos( valor : boolean)
  {
    for (let i = 0; i < this.arrayCartas.length; i++) 
    {
      (document.getElementById(i.toString()) as HTMLButtonElement).disabled = valor ;
    }
  }

  private DisabledExepto( id1 : number, id2 : number = -1)
  {
    for (let i = 0; i < this.arrayCartas.length; i++) {
      if(id1 !=i && id2 !=i)
      {
        (document.getElementById(i.toString()) as HTMLButtonElement).disabled = false ;
      }
    }
  }

  private Cargar(array : Array<any>)
  {
    array.forEach((carta)=>{
      this.arrayCartas.push({path: carta.path, valor: carta.valor, select: carta.select})
    })
  }

  private Ordenar() 
  {
    for (let i = this.arrayCartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.arrayCartas[i], this.arrayCartas[j]] = [this.arrayCartas[j], this.arrayCartas[i]];
    }
  }

  private Preparar( array :Array<any>, clase : string, dorso : string, coleccion: CollectionReference<DocumentData, DocumentData>, backgorud : string)
  {
    this.background = backgorud;
    this.Cargar(array);
    this.clase = clase;
    this.dorso = dorso;
    this.coleccion = coleccion;
  }
}