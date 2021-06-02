import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    SplashScreen
    .show({
      showDuration: 2000,
      autoHide: true,
    })
  }
}

