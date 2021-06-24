import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { FirebaseAnswerRef } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private aService: AuthService, private db: AngularFirestore, private uService: UserService) {
  }

  async uploadAnswerData(data: FirebaseAnswerRef) {
    if (!this.aService.getCurrentUser() || !data.answers) {
      return;
    }
    const res = await this.db.collection<FirebaseAnswerRef>("userAnswers").doc(this.aService.getCurrentUser().uid).set({ ...data });
  }

  async getAnswerData(): Promise<FirebaseAnswerRef> {
    let res = await this.db.collection<FirebaseAnswerRef>("userAnswers").doc(this.aService.getCurrentUser().uid).ref.get();
    if (res?.exists) {
      return <FirebaseAnswerRef>res?.data();
    } else {
      return { answers: [] }
    }
  }

  startSubscription() {
    this.uService.answers$.subscribe((val) => {
      if (!val || val.length === 0) {
        return;
      }
      this.uploadAnswerData({ answers: val })
    })
  }

  async downloadAnswersToApp() {
    let data = await this.getAnswerData();
    let a = data?.answers;
    if (!a) {
      a = []
    }
    this.uService.answers$.next(a);
  }
}
