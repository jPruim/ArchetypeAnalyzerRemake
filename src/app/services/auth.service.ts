import { Injectable } from '@angular/core';


import firebase from 'firebase/app'
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalRootPage } from '../pages/modal-root/modal-root.page';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public emailSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(public db:AngularFirestore, public modalController: ModalController, public toastController: ToastController) {

   }


   async loginUser(email: string, password: string): Promise<boolean> {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.emailSubject.next(email);
      return true;

    } catch (err) {
      this.showOkayAlert(err.message);
      return false;
    }
  }

  async createAccount(email: string, password: string): Promise<boolean> {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.emailSubject.next(email);
      return true;

    } catch (err) {
      this.showOkayAlert(err.message);
      return false;
    }
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(isUserAction: boolean = true): Promise<void> {
    if (isUserAction) { this.showLogoutToast(); }
    return firebase.auth().signOut();
  }

  getCurrentUser(): firebase.User | null { return firebase.auth()?.currentUser; }

  getCurrentUserEmail(): string { return firebase.auth()?.currentUser?.email }

  async showLogoutToast() {
    const toast = await this.toastController.create({
      message: 'Logged out.',
      position: 'bottom',
      cssClass: 'custom-toast-success',
      duration: 1500,
      color: "success",
      buttons: [
        {
          side: 'end',
          icon: 'close-outline',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });

    toast.present();
  }

  async showDeleteToast() {
    const toast = await this.toastController.create({
      message: 'Account Deleted',
      position: 'bottom',
      cssClass: 'custom-toast-success',
      duration: 1500,
      color: "success",
      buttons: [
        {
          side: 'end',
          icon: 'close-outline',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });

    toast.present();
  }


  // showOkayAlert = async (message: string): Promise<void> => {
  //   // Open a modal with confirm alert
  //   const modalRoot = await this.modalController.create({
  //     component: ModalRootPage,
  //     backdropDismiss: true,
  //     cssClass: 'confirm-alert', // NOTE: This class must be defined in global.scss
  //     componentProps: {
  //       showHeader: false,
  //       message: message,
  //       buttons: [
  //         {
  //           title: "Okay",
  //           handleClick: () => { },
  //           styles: "--background: var(--ion-color-primary);",
  //           closeOnClick: true
  //         }
  //       ]
  //     }
  //   });

  //   // Present the modal
  //   modalRoot.present();
  // }

  async showOkayAlert(message: string){
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      cssClass: 'custom-toast-success',
      duration: 1500,
      color: "success",
      buttons: [
        {
          side: 'end',
          icon: 'close-outline',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });

    toast.present();
  }


}
