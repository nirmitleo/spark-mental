import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangedVerdict } from 'src/app/models/changed-verdict.model';
import { Constants } from 'src/app/models/constants.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  blank = true;
  verdict = Constants.VERDICT_TYPE.INCORRECT;
  answer;
  @Input() question: Question;
  @Output() verdictChange = new EventEmitter<ChangedVerdict>();


  constructor() { }

  ngOnInit() {
  }

  evaluateResult() {
    if (isNaN(this.answer)) {
      return;
    }
    const response: string = this.answer + '';
    this.blank = true;
    this.verdict = Constants.VERDICT_TYPE.INCORRECT;

    if (response.length > 0) {
      this.blank = false;
      const result = parseInt(response, 10);
      this.verdict = result === this.question.result ? Constants.VERDICT_TYPE.CORRECT : Constants.VERDICT_TYPE.INCORRECT;
      this.verdictChange.emit({
        serialID: this.question.serialID,
        verdict: this.verdict,
        value: result,
      });
    }
  }
}
