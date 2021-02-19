import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionDictionary } from 'src/assets/QuestionList';
import { Question } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public question$: BehaviorSubject<Question>
  private questionList = QuestionDictionary
  constructor() {
    this.question$ = new BehaviorSubject(this.getQuestion());
  }
  getQuestion(): Question {
    return this.questionList[Math.floor(Math.random() * this.questionList.length)]
  }
  nextQuestion() {
    this.question$.next(this.getQuestion())
  }

  isAttributeKey(key: string) {
    return key !== "text" && key !== "id" && key !== "questionSet" && key !== "";
  }
  getNumericalValue(n: number) {
    if (n == 0) { return -3; }
    if (n == 1) { return -1; }
    if (n == 2) { return 1; }
    if (n == 3) { return 3; }
    return 0;
  }
}
