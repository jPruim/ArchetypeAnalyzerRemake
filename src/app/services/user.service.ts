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
  public attributes$ = new BehaviorSubject<AttributeValue>({}); //With ratioAttributes being added, attributres and maxAttributes may not need to be exposed, i.e. could use something simpler than a BehaviorSubject
  public maxAttributes$ = new BehaviorSubject<AttributeValue>({});
  public ratioAttributes$ = new BehaviorSubject<AttributeValue>({});

  public families$ = new BehaviorSubject<FamilyValue>({});
  public percentFamilies$ = new BehaviorSubject<FamilyValue>({});

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
    let attr = this.attributes$.getValue();
    let maxAttr = this.maxAttributes$.getValue();
    let ratioAttr = this.ratioAttributes$.getValue();

    let fam = this.families$.getValue();
    let percentFamilies = this.percentFamilies$.getValue();

    if (this.answers.length == 0) {
      return;
    }
    for (let i = 0; i < this.answers.length; i++) {
      let q = this.questionList[this.answers[i].id]
      Object.keys(q).forEach((el) => {
        if (this.qService.isAttributeKey(el)) {
          let attrVal = q[el] * this.qService.getNumericalValue(this.answers[i].response)
          attr[el] = attr[el] + q[el] * attrVal || attrVal;
          maxAttr[el] = maxAttr[el] + q[el] * 3 || q[el] * 3;
          ratioAttr[el] = Math.trunc(attr[el]*100/maxAttr[el]);
        }
      })
    }
    Object.keys(attr).forEach((el) => {
      this.attributeCon.forEach((conAttr) => {
        if (el == conAttr.attribute) {
          Object.keys(conAttr).forEach((conFam) => {
            if (conFam !== "attribute") {
              fam[conFam] = conAttr[conFam]*attr[el];
            }
          })
        }
      })
    })
    console.log("fam:");
    console.log(fam);
    let familySum = 0;
    Object.keys(fam).forEach((family) => {
      familySum = familySum + fam[family];
    })
    console.log("familySum:");
    console.log(familySum);
    Object.keys(fam).forEach((family) => {
      percentFamilies[family] = Math.trunc(fam[family]*100/familySum);
    })
    console.log("percentFamilies:");
    console.log(percentFamilies);
    this.maxAttributes$.next(maxAttr);
    this.attributes$.next(attr);
    this.ratioAttributes$.next(ratioAttr);
  }



}
