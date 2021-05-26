import { Component, OnInit } from '@angular/core';
import { AttributeDisplay, AttributeValue, FamilyDisplay, FamilyValue } from 'src/app/interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  public attributes: AttributeValue;
  public maxAttributes: AttributeValue;
  public ratioAttributes: AttributeValue;
  public attributeDisplay: Array<AttributeDisplay>;

  public percentFamilies: FamilyValue;
  public familyDisplay: Array<FamilyDisplay>;

  constructor(private uService: UserService) {
    this.attributes = this.uService.attributes$.getValue();
    this.maxAttributes = this.uService.maxAttributes$.getValue();
    this.ratioAttributes = this.uService.ratioAttributes$.getValue();
    this.uService.attributes$.subscribe((val) => {
      this.attributes = val;
      this.generateAttributeTable();
    });
    this.uService.maxAttributes$.subscribe((val) => this.maxAttributes = val);
    this.uService.ratioAttributes$.subscribe((val) => this.ratioAttributes = val);
    this.uService.percentFamilies$.subscribe((val) => {
      this.percentFamilies = val;
      this.generateFamilyTable();
    });
  }

  ngOnInit() {
  }

  generateAttributeTable() {

    let dis: Array<AttributeDisplay> = [];
    Object.keys(this.attributes).forEach(key => {
      dis.push({ attribute: key, ratio: this.ratioAttributes[key] });
    });
    this.attributeDisplay = dis.sort((el1, el2) => (el1.attribute.localeCompare(el2.attribute)));
  }

  generateFamilyTable() {

    let famDis: Array<FamilyDisplay> = [];
    Object.keys(this.percentFamilies).forEach(key => {
      famDis.push({ family: key, percent: this.percentFamilies[key] });
    });
    this.familyDisplay = famDis.sort((el1, el2) => (el1.percent - el2.percent));
  }
}
