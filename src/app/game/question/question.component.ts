import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  blank = true;
  verdict = false;
  @Input() question: Question;
  @Output() verdictChange = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
  }

  evaluateResult(event) {
    const response: string = event.target.value;
    this.blank = true;
    this.verdict = false;

    if (response.length > 0) {
      this.blank = false;
      const result = parseInt(response, 10);
      this.verdict = result === this.question.result;
      this.verdictChange.emit(this.verdict);
    }
  }
}
