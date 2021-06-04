import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-boxes',
  templateUrl: './help-boxes.component.html',
  styleUrls: ['./help-boxes.component.scss'],
})
export class HelpBoxesComponent implements OnInit {
  @Input()
  questionTitle: string = "Question";

  @Input()
  expand: boolean = false;

  @Input()
  infoText: String = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


  constructor() { }


  handleClick(){
    this.expand = !this.expand;
  }
  ngOnInit() {}

}
