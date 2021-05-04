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

  MIN_OPERAND1 = 11;
  MAX_OPERAND1 = 13;
  MIN_OPERAND2 = 11;
  MAX_OPERAND2 = 20;

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

      let operand1 = this.getRandomInteger(this.MIN_OPERAND1, this.MAX_OPERAND1);
      let operand2 = this.getRandomInteger(this.MIN_OPERAND2, this.MAX_OPERAND2);

      [operand1, operand2] = this.shuffle(operand1, operand2);

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
        verdict: Verdict.NOT_ATTEMPTED,
      };

      const verdict = {
        serialID: i,
        verdict: Verdict.NOT_ATTEMPTED,
      };
      this.verdictMap[i] = verdict;
      this.questions.push(question);
    }
  }

  onVerdictChange(changedVerdict: ChangedVerdict) {
    const serialID = changedVerdict.serialID;
    const newVerdict = changedVerdict.verdict;

    if (this.verdictMap[serialID].verdict === Verdict.CORRECT) {
      if (newVerdict === Verdict.INCORRECT) {
        // incorrect attempt
        this.questionsLeft++;
        this.totalIncorrectAttempts++;
      } else if (newVerdict === Verdict.NOT_ATTEMPTED) {
        // not attempted
        this.questionsLeft++;
      }
    } else if (this.verdictMap[serialID].verdict === Verdict.INCORRECT) {
      if (newVerdict === Verdict.CORRECT) {
        // correct attempt
        this.questionsLeft--;
        this.totalCorrectAttempts++;
      } else if (newVerdict === Verdict.INCORRECT) {
        this.totalIncorrectAttempts++;
      } else if (newVerdict === Verdict.NOT_ATTEMPTED) {
        this.questionsLeft++;
      }
    } else if (this.verdictMap[serialID].verdict === Verdict.NOT_ATTEMPTED) {
      if (newVerdict === Verdict.CORRECT) {
        this.questionsLeft--;
        this.totalCorrectAttempts++;
      } else if (newVerdict === Verdict.INCORRECT) {
        this.totalIncorrectAttempts++;
      }
    }
    console.log(`Questions left: ${this.questionsLeft}, Total Correct attempts: ${this.totalCorrectAttempts}, Total Incorrect attempts: ${this.totalIncorrectAttempts}`);
    this.verdictMap[serialID].verdict = newVerdict;
  }

  getOperand(operationType: OperationType): number {
    const operationOptions = this.operationOptions.get(operationType);
    const operand = this.getRandomInteger(operationOptions.MIN_DIFFICULTY, operationOptions.MAX_DIFFICULTY);
    return operand;
  }

  private getRandomInteger(low: number, high: number): number {
    let value = Math.random();
    value = value * (high - low + 1);
    value = value + low;
    return Math.trunc(value);
  }

  private shuffle(value1: number, value2: number): [number, number] {
    if (Math.trunc(Math.random() * 100) % 2 === 0) {
      return [value1, value2];
    }
    return [value2, value1];
  }
}
