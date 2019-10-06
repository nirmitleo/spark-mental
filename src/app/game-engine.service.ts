import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants.model';
import { Question } from 'src/app/models/question.model';
import { Verdict } from 'src/app/models/verdict.model';
import { ChangedVerdict } from './models/changed-verdict.model';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  GAME_LENGTH = 10;
  questions = [];
  verdictMap = {};
  questionsLeft = this.GAME_LENGTH;
  totalCorrectAttempts = 0;
  totalIncorrectAttempts = 0;



  operationOptions = {
    ADDITION: {
      operationType: 'ADDITION',
      MIN_DIFFICULTY: 100,
      MAX_DIFFICULTY: 999
    },
    MULTIPLICATION: {
      operationType: 'MULTIPLICATION',
      MIN_DIFFICULTY: 2,
      MAX_DIFFICULTY: 25,
    }
  };

  constructor() { }

  newGame() {
    this.questions = [];
    this.verdictMap = {};
    this.questionsLeft = this.GAME_LENGTH;
    for (let i = 0; i < this.GAME_LENGTH; i++) {

      let operationType = this.operationOptions.MULTIPLICATION.operationType;
      if (Math.random() <= 0.3) {
        operationType = this.operationOptions.ADDITION.operationType;
      }

      const operand1 = this.getOperand(operationType);
      const operand2 = this.getOperand(operationType);
      let result = operand1 * operand2;
      if (operationType === this.operationOptions.ADDITION.operationType) {
        result = operand1 + operand2;
      }

      const question: Question = {
        serialID: i,
        operand1: operand1,
        operand2: operand2,
        result: result,
        operationType: operationType
      };

      const verdict: Verdict = {
        serialID: i,
        verdict: Constants.VERDICT_TYPE.NOT_ANSWERED,
        incorrectVerdicts: new Set<number>(),
      };
      this.verdictMap[i] = verdict;
      this.questions.push(question);
    }
  }

  onVerdictChange(changedVerdict: ChangedVerdict) {
    const serialID = changedVerdict.serialID;
    const verdict = changedVerdict.verdict;
    const value = changedVerdict.value;

    if (this.verdictMap[serialID].verdict === Constants.VERDICT_TYPE.CORRECT) {
      if (verdict === Constants.VERDICT_TYPE.INCORRECT) {
        // incorrect attempt
        this.questionsLeft++;
        this.totalIncorrectAttempts++;
      }
    } else {
      if (verdict === Constants.VERDICT_TYPE.CORRECT) {
        // correct attempt
        this.questionsLeft--;
        this.totalCorrectAttempts++;
      } else {
        this.totalIncorrectAttempts++;
      }

    }
    this.verdictMap[serialID] = verdict;
  }

  getOperand(operationType: string): number {
    let operationOptions = null;

    if (operationType === this.operationOptions.ADDITION.operationType) {
      operationOptions = this.operationOptions.ADDITION;
    } else if (operationType === this.operationOptions.MULTIPLICATION.operationType) {
      operationOptions = this.operationOptions.MULTIPLICATION;
    }
    let value = Math.random();
    value = value * (operationOptions.MAX_DIFFICULTY - operationOptions.MIN_DIFFICULTY + 1);
    value = value + operationOptions.MIN_DIFFICULTY;
    return Math.trunc(value);
  }
}
