import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionDictionary } from 'src/assets/QuestionList';
import { Question } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public question$: BehaviorSubject<Question>
  private fullQuestionList = QuestionDictionary
  private usedQuestionList: Array<Question>
  private whichQuestionList = "full";
  constructor() {
    this.usedQuestionList = this.createQuestionList("full");
    this.question$ = new BehaviorSubject(this.getQuestion(this.usedQuestionList));
  }
  createQuestionList(whichList): Array<Question> {
    switch(whichList) {
      case "full":
        return this.fullQuestionList;
    }
  }
  getQuestion(questionList): Question {
    return questionList[Math.floor(Math.random() * questionList.length)]
  }
  nextQuestion() {
    this.question$.next(this.getQuestion(this.usedQuestionList))
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
