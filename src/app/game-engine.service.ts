import { Injectable } from '@angular/core';
import { ChangedVerdict } from 'src/types/changed-verdict.type';
import { OperationType } from 'src/types/operation-type.type';
import { Question } from 'src/types/question.type';
import { Verdict } from 'src/types/verdict.type';

@Injectable({
  providedIn: 'root',
})
export class GameEngineService {
  GAME_LENGTH = 10;
  questions = [];
  verdictMap = {};
  questionsLeft = this.GAME_LENGTH;
  totalCorrectAttempts = 0;
  totalIncorrectAttempts = 0;

  operationOptions = new Map<OperationType, { MIN_DIFFICULTY: number; MAX_DIFFICULTY: number }>();

  constructor() {
    this.operationOptions.set(OperationType.ADDITION, {
      MIN_DIFFICULTY: 100,
      MAX_DIFFICULTY: 999,
    });
    this.operationOptions.set(OperationType.MULTIPLICATION, {
      MIN_DIFFICULTY: 2,
      MAX_DIFFICULTY: 13,
    });
  }

  newGame() {
    this.questions = [];
    this.verdictMap = {};
    this.questionsLeft = this.GAME_LENGTH;
    for (let i = 0; i < this.GAME_LENGTH; i++) {
      let operationType = OperationType.MULTIPLICATION;
      if (Math.random() <= -1) {
        operationType = OperationType.ADDITION;
      }

      const operand1 = this.getOperand(operationType);
      const operand2 = this.getOperand(operationType);
      let result = operand1 * operand2;
      if (operationType === OperationType.ADDITION) {
        result = operand1 + operand2;
      }

      const question: Question = {
        serialID: i,
        operand1,
        operand2,
        result,
        operationType,
      };

      const verdict = {
        serialID: i,
        verdict: Verdict.NOT_ATTEMPTED,
        incorrectVerdicts: new Set<number>(),
      };
      this.verdictMap[i] = verdict;
      this.questions.push(question);
    }
  }

  onVerdictChange(changedVerdict: ChangedVerdict) {
    const serialID = changedVerdict.serialID;
    const verdict = changedVerdict.verdict;

    if (this.verdictMap[serialID].verdict === Verdict.CORRECT) {
      if (verdict === Verdict.INCORRECT) {
        // incorrect attempt
        this.questionsLeft++;
        this.totalIncorrectAttempts++;
      }
    } else {
      if (verdict === Verdict.CORRECT) {
        // correct attempt
        this.questionsLeft--;
        this.totalCorrectAttempts++;
      } else {
        this.totalIncorrectAttempts++;
      }
    }
    this.verdictMap[serialID] = verdict;
  }

  getOperand(operationType: OperationType): number {
    const operationOptions = this.operationOptions.get(operationType);
    let value = Math.random();
    value = value * (operationOptions.MAX_DIFFICULTY - operationOptions.MIN_DIFFICULTY + 1);
    value = value + operationOptions.MIN_DIFFICULTY;
    return Math.trunc(value);
  }
}
