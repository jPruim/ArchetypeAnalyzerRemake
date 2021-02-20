import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question, QuestionAnswer } from 'src/app/interface';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  public question: Question;
  private answers: QuestionAnswer[];
  constructor(private qService: QuestionService, private uService: UserService) {
    this.qService.question$.subscribe(value => this.question = value);
    this.uService.answers$.subscribe(val => this.answers = val);
  }

  ngOnInit() {

  }
  nextQuestion(clicked_id) {
    let i = this.answers.findIndex((el) => el.id === this.question.id);
    if (i === -1) {
      i = this.answers.length;
    }
    this.answers[i] = { id: this.question.id, response: clicked_id }
    this.uService.answers$.next(this.answers);
    this.qService.nextQuestion();
  }
}
