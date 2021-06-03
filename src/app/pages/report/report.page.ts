import { Component, OnInit } from '@angular/core';
import { FamilyReportDisplay } from 'src/app/interface';
import { UserService } from 'src/app/services/user.service';
import { FamilyReports } from 'src/assets/FamilyReports';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  public maxFamily: string;
  public FamilyReportDisplay: FamilyReportDisplay;
  public FamilyReport: Array<Array<string>>;
  private familyReports = FamilyReports;

  constructor(private uService: UserService) {
    this.uService.maxFamily$.subscribe((val) =>{
      this.maxFamily = val;
      this.generateFamilyReport();
    })
  }

  ngOnInit() {
  }

  generateFamilyReport() {
    if (this.maxFamily == "tie" || this.maxFamily == "") {
      return;
    }
    let dis: Array<Array<string>> = [];
    this.familyReports.forEach((report) => {
      if (this.maxFamily == report.family) {
        this.FamilyReportDisplay = report;
        return; //forEach accepts a function, so this return just ends the ForEach
      }
    })
    
    Object.keys(this.FamilyReportDisplay).forEach(key => {
      let label = key;
      let subreport = this.FamilyReportDisplay[key];
      switch(key) {
        case "family":
          label = "Family";
          subreport = "The " + subreport[0].toUpperCase() + subreport.substr(1) + " Family"
          break;
        case "description":
          label = "Description";
          break;
        case "challenges":
          label = "Challenges Faced";
          break;
        case "relationships":
          label = "Relationships to Other Types";
          break;
        case "tips":
          label = "Brand Storytelling Tips";
          break;
      }
      dis.push([label,subreport]);
    })
    this.FamilyReport = dis;
  }

}
