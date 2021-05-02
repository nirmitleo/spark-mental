import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChangedVerdict } from 'src/types/changed-verdict.type';
import { Question } from 'src/types/question.type';
import { Verdict } from 'src/types/verdict.type';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  answer: number;
  verdict: Verdict;

  @Input() public question: Question;
  @Output() verdictChange = new EventEmitter<ChangedVerdict>();

  @ViewChild('answerMatInputField', { read: ElementRef, static: true }) answerMatInputField: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit() {
    this.verdict = this.question.verdict;
  }

  public focus() {
    this.answerMatInputField?.nativeElement?.focus();
  }

  evaluateResult() {
    const changedVerdict: ChangedVerdict = {
      serialID: this.question.serialID,
      verdict: Verdict.NOT_ATTEMPTED,
    };

    if (this.isValidNumber(this.answer)) {
      const response: string = this.answer + '';
      const result = parseInt(response, 10);
      changedVerdict.verdict = result === this.question.result ? Verdict.CORRECT : Verdict.INCORRECT;
    }
    this.verdict = changedVerdict.verdict;
    this.verdictChange.emit(changedVerdict);
  }

  private isValidNumber(value: number) {
    return !isNaN(value);
  }
}
