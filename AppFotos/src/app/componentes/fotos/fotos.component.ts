import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss'],
})
export class FotosComponent implements OnInit{

  public voto : boolean= false;
  public yaExiste : boolean= false;
  @Input() foto: any="";
  @Input() tipo: any="";
  constructor(private firebase : FirebaseService, private global: GlobalService) {}
  ngOnInit(): void {
    if(this.foto.Votos.length>0)
      {
        for(let voto of this.foto.Votos)
        {
          if(voto.Usuario == this.global.user)
          {
            this.yaExiste = true;
            if(voto.valor)
            {
              this.voto = true;
            }
            break;
          }
        }
      }
  }

  Votacion(opcion : boolean)
  {
    if(this.yaExiste)
    {
      for(let voto of this.foto.Votos)
      {
        if(voto.Usuario == this.global.user)
        {
          if(opcion == voto.valor)
          {
            voto.valor = !opcion
          }    
          else
          {
            voto.valor = opcion
          }
          this.voto = voto.valor
          this.firebase.ModificarVotos(this.foto.Id,this.foto.Votos,this.tipo);
          break;
        }
      }
    }
    else
    {
      this.yaExiste = true;
      this.voto = opcion;
      this.foto.Votos.push({ Usuario: this.global.user, valor:opcion})
      this.firebase.ModificarVotos(this.foto.Id,this.foto.Votos,this.tipo);
    }
  }

}
