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
  public attributes$ = new BehaviorSubject<AttributeValue>({}); //With ratioAttributes being added, attributres and maxAttributes may not need to be exposed, i.e. could use something simpler than a BehaviorSubject
  public maxAttributes$ = new BehaviorSubject<AttributeValue>({});
  public ratioAttributes$ = new BehaviorSubject<AttributeValue>({});

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
    let attr = this.attributes$.getValue();
    let maxAttr = this.maxAttributes$.getValue();
    let ratioAttr = this.ratioAttributes$.getValue();
    if (this.answers.length == 0) {
      return;
    }
    for (let i = 0; i < this.answers.length; i++) {
      let q = this.questionList[this.answers[i].id]
      Object.keys(q).forEach((el) => {
        if (this.qService.isAttributeKey(el)) {
          attr[el] = attr[el] + q[el] * this.qService.getNumericalValue(this.answers[i].response) || q[el] * this.qService.getNumericalValue(this.answers[i].response);
          maxAttr[el] = maxAttr[el] + q[el] * 3 || q[el] * 3;
          ratioAttr[el] = attr[el]/maxAttr[el];
        }
      })
    }
    this.maxAttributes$.next(maxAttr);
    this.attributes$.next(attr);
    this.ratioAttributes$.next(ratioAttr);
  }



}
