import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent  implements OnInit {

  @Input() tipo: string="";

  constructor(public global :GlobalService) { }

  ngOnInit() {}

}
