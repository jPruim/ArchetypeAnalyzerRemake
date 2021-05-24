import { Component, OnInit } from '@angular/core';
import { AttributeDisplay, AttributeValue } from 'src/app/interface';
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

  constructor(private uService: UserService) {
    this.attributes = this.uService.attributes$.getValue();
    this.maxAttributes = this.uService.maxAttributes$.getValue();
    this.ratioAttributes = this.uService.ratioAttributes$.getValue();
    this.uService.attributes$.subscribe((val) => {
      this.attributes = val;
      this.generateTable();
    });
    this.uService.maxAttributes$.subscribe((val) => this.maxAttributes = val);
    this.uService.ratioAttributes$.subscribe((val) => this.ratioAttributes = val);
  }

  ngOnInit() {
  }

  generateTable() {

    let dis: Array<AttributeDisplay> = [];
    Object.keys(this.attributes).forEach(key => {
      dis.push({ attribute: key, ratio: this.ratioAttributes[key] });
      console.log(this.ratioAttributes[key])
    });
    this.attributeDisplay = dis.sort((el1, el2) => (el2.ratio - el1.ratio));
  }
}
