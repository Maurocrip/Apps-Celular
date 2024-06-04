import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErroresService } from 'src/app/servicios/errores.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public grupo : FormGroup;
  public email : string= "";
  public contra : string= "";

  constructor(private Firebase :FirebaseService, private fb : FormBuilder, private global : GlobalService,private router: Router,private errores : ErroresService) {
    this.grupo = this.fb.group
    ({
      email : ["",[Validators.required,Validators.email]],
      contraseña :["",[Validators.required]]
    });
  }

  async LogIn()
  {
    if(this.grupo.valid)
    {
      const spiner = await this.global.getLoadingCtrl("dots");
      spiner.present()

      try
      {
        await this.Firebase.LogIn(this.grupo.value.email,this.grupo.value.contraseña)
        .then(async(res)=> 
        {
          this.BuscarUsuario(res.user.email!);
          this.errores.Generartost("Bienvenido " + this.global.user,"success","green");
          this.global.email= res.user.email;
          this.router.navigate(['home']);
          this.email = "";
          this.contra = "";
        })
      }
      catch(error: any)  
      {
        console.log("errore: " + error);
        this.errores.MostrarError(error.code);
      };
      setTimeout(()=>{
        spiner.dismiss();
      }, 1000)
    }
    else
    {
      this.errores.MostrarError("CI");
    }
  }

  private BuscarUsuario(email: string )
  {
    for (let element of this.global.arrayUsuario)
    {
      if(element["Email"] == email)
        {
          this.global.user = element["Usuario"]
        }
    }
  }

  Rellenar(email : string,  contra : string)
  {
    this.email = email;
    this.contra = contra;

  }

}
