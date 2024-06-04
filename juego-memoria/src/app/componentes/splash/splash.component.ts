import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent {

  constructor(private router: Router, private platform: Platform) { }

  async ionViewDidEnter() {
    // Wait for the platform to be ready before hiding the splash screen

      await SplashScreen.hide().then(() => 
      {
        setTimeout(() => 
        {
         // window.screen.orientation.unlock();
          this.router.navigateByUrl('/logIn',{replaceUrl: true});
        }, 5000);

      });

  }

}
