import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public question$: BehaviorSubject<Question>
  constructor() {
    this.question$ = new BehaviorSubject(this.getQuestion());
  }
  getQuestion(): Question {
    let n = Math.floor(Math.random() * 100 + 1);
    return { id: n, text: "This is question number: " + String(n) }
  }
  nextQuestion() {
    this.question$.next(this.getQuestion())
  }
}
