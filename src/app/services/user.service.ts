import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionDictionary } from 'src/assets/QuestionList';
import { AttributeValue, QuestionAnswer } from '../interface';
import { QuestionService } from './question.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedIn: boolean;
  public answers$: BehaviorSubject<Array<QuestionAnswer>>;
  //index of 0 is attributes, 1 is max attributes
  public attributes$ = new BehaviorSubject<AttributeValue[]>([{},{},{}]);

  private answers: Array<QuestionAnswer>;
  private questionList = QuestionDictionary;

  constructor(private qService: QuestionService) {
    this.loggedIn = false;
    this.answers$ = new BehaviorSubject([])
    this.answers$.subscribe(val => {
      this.answers = val;
      this.calculateAttributes();
    });
  }

  calculateAttributes() {
    if (this.answers.length == 0) {
      return;
    }
    let attr = {};
    let maxAttr = {};
    let ratioAttr = {};
    for (let i = 0; i < this.answers.length; i++) {
      let q = this.questionList[this.answers[i].id]
      Object.keys(q).forEach((el) => {
        if (this.qService.isAttributeKey(el)) {
          attr[el] = attr[el] + q[el] * this.qService.getNumericalValue(this.answers[i].response) || q[el] * this.qService.getNumericalValue(this.answers[i].response);
          maxAttr[el] = maxAttr[el] + q[el] * 3 || q[el] * 3;
          ratioAttr[el] = Math.trunc(attr[el]*100/maxAttr[el]);
        }
      })
    }
    this.attributes$.next([attr,maxAttr,ratioAttr]);
  }



}
