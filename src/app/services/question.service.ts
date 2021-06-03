import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionDictionary } from 'src/assets/QuestionList';
import { AttributesToFamiliesDictionary } from '../../assets/AttributesToFamilies';
import { Question } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public question$: BehaviorSubject<Question>
  private fullQuestionList = QuestionDictionary
  private usedQuestionList: Array<Question>
  private whichQuestionList = "family";
  constructor() {
    this.usedQuestionList = this.createQuestionList(this.whichQuestionList);
    this.question$ = new BehaviorSubject(this.getQuestion());
  }
  createQuestionList(whichList): Array<Question> {
    let newQuestionList: Array<Question> = []
    switch(whichList) {
      case "full":
        return this.fullQuestionList;
      case "family":
        let famAttr: Array<String> = []
        let qAdded = false;
        AttributesToFamiliesDictionary.forEach((famCon) => {
          famAttr.push(famCon.attribute);
        })
        this.fullQuestionList.forEach((question) => {
          Object.keys(question).forEach((key) => {
            if(this.isAttributeKey(key)) {
              famAttr.forEach((attribute) => {
                if(key == attribute) {
                  newQuestionList.push(question);
                  qAdded = true;
                  return;
                }
              })
            }
            if(qAdded == true) {
              qAdded = false;
              return;
            }
          })
        })
        return newQuestionList;
    }
  }
  getQuestion(): Question {
    return this.usedQuestionList[Math.floor(Math.random() * this.usedQuestionList.length)]
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
