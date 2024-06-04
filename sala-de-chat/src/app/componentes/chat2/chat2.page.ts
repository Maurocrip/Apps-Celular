import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { GlobalService } from 'src/app/servicios/global.service';


@Component({
  selector: 'app-chat2',
  templateUrl: './chat2.page.html',
  styleUrls: ['./chat2.page.scss'],
})
export class Chat2Page implements OnInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;
  @ViewChild('scrollAnchor', { static: false }) private scrollAnchor!: ElementRef;
  public arrayMensajes: Array<any> = [];

  constructor(private router: Router, public global: GlobalService, private firebase: FirebaseService) { }

  ngOnInit() {
    this.firebase.TraerChat("chat2")
      .subscribe((res) => {
        this.arrayMensajes = [...res];
        this.arrayMensajes.sort((a, b) => this.global.ordenar(a, b))
        setTimeout(() => {
          this.global.scrollToBottom(this.scrollAnchor);
        }, 1);
      });
  }

  ngAfterViewInit() {
    this.global.scrollToBottom(this.scrollAnchor);
  }

  public Volver() {
    this.router.navigate(['Sala']);
  }


  public Guardar() 
  {
    let textArea = (document.getElementById("input") as HTMLButtonElement);
    this.global.Guardar(this.firebase.colChat2,textArea);
  }

}
