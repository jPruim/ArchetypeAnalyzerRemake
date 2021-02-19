import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedIn: boolean
  public answers$: BehaviorSubject<any>
  public results$: BehaviorSubject<number>
  private answers: any
  constructor() {
    this.loggedIn = false;
    this.answers$ = new BehaviorSubject({})
    this.answers$.subscribe(val => {
      this.answers = val;
      this.getResults()
    });
    this.results$ = new BehaviorSubject(1.5);
  }
  getResults(): number {
    let averageResponse = 1.5;
    let total = 0;
    let number = 0;
    for (const [_, value] of Object.entries(this.answers)) {
      number++;
      total += Number(value);
    }
    if (number > 0) {
      averageResponse = total / number;
      this.results$.next(averageResponse);
    }
    return averageResponse;
  }
}
