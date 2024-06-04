import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-chat1',
  templateUrl: './chat1.page.html',
  styleUrls: ['./chat1.page.scss'],
})
export class Chat1Page implements OnInit, AfterViewInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;
  @ViewChild('scrollAnchor', { static: false }) private scrollAnchor!: ElementRef;

  public arrayMensajes :Array<any> =  [];

  constructor(private router : Router, public global : GlobalService, private firebase: FirebaseService) { }

  ngOnInit() 
  {
    this.firebase.TraerChat("chat1")
    .subscribe((res)=>
    {
      this.arrayMensajes = [...res];
      this.arrayMensajes.sort((a, b) => this.global.ordenar(a, b))
      this.global.scrollToBottom(this.scrollAnchor);
    });
  }

  ngAfterViewInit() {
    this.global.scrollToBottom(this.scrollAnchor);
  }

  public Volver()
  {
    this.router.navigate(['Sala']);
  }

  public Guardar() 
  {
    let textArea = (document.getElementById("input") as HTMLButtonElement);
    this.global.Guardar(this.firebase.colChat1,textArea);
  }

}
