import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public enteredEmail: string = "";
  public enteredPwd: string = "";
  public enteredPwd2: string = "";

  public showLogin: boolean = true;
  constructor(private authService: AuthService, private navController: NavController, private sService: StorageService) { }

  ngOnInit() {
  }

  async attemptLogin(){
    let success = await this.authService.loginUser(this.enteredEmail,this.enteredPwd);
    if(success){
      this.authService.showOkayAlert("Logged in!");
      this.navController.navigateForward('app');
      await this.sService.downloadAnswersToApp();
      this.sService.startSubscription();
    }else{
      this.authService.showOkayAlert("Unknown error occured. Code 36");
    }

  }

  toggleStatus(){
    this.showLogin = !this.showLogin;
  }

  async attemptCreate(){
    if(this.enteredPwd.length < 8){
      this.authService.showOkayAlert("Password must be 8 characters long");
      return;
    } else if(this.enteredPwd!==this.enteredPwd2){
      this.authService.showOkayAlert("Passwords must match");
      return;
    }
    let success = await this.authService.createAccount(this.enteredEmail,this.enteredPwd);
    if(success){
      this.authService.showOkayAlert("Logged in!");
      await this.sService.downloadAnswersToApp();
      this.sService.startSubscription();
      this.navController.navigateForward('app');
    }else{
      this.authService.showOkayAlert("Unknown error occured. Code 37");
    }

  }


}
