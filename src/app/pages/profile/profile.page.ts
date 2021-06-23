import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public currentUser: string;

  constructor(private authService:AuthService) {

    this.authService.emailSubject.subscribe( (val) => this.currentUser);

   }
  
  ngOnInit() {
  }

}
