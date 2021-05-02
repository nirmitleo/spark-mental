import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/types/question.type';
import { Verdict } from 'src/types/verdict.type';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input() question: Question;
  @Output() verdictChange = new EventEmitter();

  constructor() {}

  evaluateResult(event) {
    const response: string = event.target.value;
    if (response.length > 0) {
      const result: number = parseInt(response, 10);
      this.question.verdict = result === this.question.result ? Verdict.CORRECT : Verdict.INCORRECT;
    } else {
      this.question.verdict = Verdict.NOT_ATTEMPTED;
    }
    this.verdictChange.emit();
  }
}
