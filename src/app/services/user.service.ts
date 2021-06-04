import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionDictionary } from 'src/assets/QuestionList';
import { AttributesToFamiliesDictionary } from 'src/assets/AttributesToFamilies';
import { FamilyValue, AttributeValue, QuestionAnswer } from '../interface';
import { QuestionService } from './question.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedIn: boolean;
  public answers$: BehaviorSubject<Array<QuestionAnswer>>;
  //index of 0 is attributes, 1 is max attributes
  public attributes$ = new BehaviorSubject<AttributeValue[]>([{},{},{}]);

  public families$ = new BehaviorSubject<FamilyValue>({});
  public percentFamilies$ = new BehaviorSubject<FamilyValue>({});
  public maxFamily$ = new BehaviorSubject<string>("");

  private answers: Array<QuestionAnswer>;
  private questionList = QuestionDictionary;
  private attributeCon = AttributesToFamiliesDictionary;

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

    let fam = {};
    let percentFam = {
      caregiver: 0,
      citizen: 0,
      creator: 0,
      explorer: 0,
      hero: 0,
      innocent: 0,
      jester: 0,
      lover: 0,
      magician: 0,
      rebel: 0,
      sage: 0,
      sovereign: 0
    };

    for (let i = 0; i < this.answers.length; i++) {
      let q = this.questionList[this.answers[i].id]
      Object.keys(q).forEach((el) => {
        if (this.qService.isAttributeKey(el)) {
          let attrVal = q[el] * this.qService.getNumericalValue(this.answers[i].response)
          attr[el] = attr[el] + attrVal || attrVal;
          maxAttr[el] = maxAttr[el] + Math.abs(q[el]) * 3 || Math.abs(q[el]) * 3;
          ratioAttr[el] = Math.trunc(attr[el]*100/maxAttr[el]);
        }
      })
    }
    Object.keys(attr).forEach((el) => {
      this.attributeCon.forEach((conAttr) => {
        if (el == conAttr.attribute) {
          Object.keys(conAttr).forEach((conFam) => {
            if (conFam !== "attribute") {
              fam[conFam] = fam[conFam] + conAttr[conFam]*attr[el] || conAttr[conFam]*attr[el];
            }
          })
        }
      })
    })
    let familySum = 0;
    Object.keys(fam).forEach((family) => {
      familySum = familySum + Math.abs(fam[family]);
    })
    Object.keys(fam).forEach((family) => {
      percentFam[family] = Math.trunc(fam[family]*100/familySum);
    })
    let maxFamily = "";
    let maxFamilyPercent = -101;
    let maxFamilytie = true;
    if (this.answers.length == 0) {
      maxFamilytie = false
    }
    Object.keys(percentFam).forEach((family) => {
      if (percentFam[family] > maxFamilyPercent) {
        maxFamilyPercent = percentFam[family];
        maxFamily = family;
        maxFamilytie = false;
      }
      else if (percentFam[family] == maxFamilyPercent) {
        maxFamilytie = true;
      }
    })
    if (maxFamilytie) {
      maxFamily = "tie";
    }

    this.attributes$.next([attr,maxAttr,ratioAttr]);
    this.percentFamilies$.next(percentFam);
    this.maxFamily$.next(maxFamily);
  }



}
