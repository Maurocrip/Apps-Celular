import { Component } from '@angular/core';
import { GlobalService } from './servicios/global.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public global : GlobalService, private router: Router) 
  {
    this.router.navigate(['Splash']);
  }
}
