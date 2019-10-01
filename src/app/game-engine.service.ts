import { Injectable } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  GAME_LENGTH = 10;
  questions = []

  operationOptions = {
    ADDITION: {
      operationType: 'ADDITION',
      MIN_DIFFICULTY: 100,
      MAX_DIFFICULTY: 999
    },
    MULTIPLICATION: {
      operationType: 'MULTIPLICATION',
      MIN_DIFFICULTY: 2,
      MAX_DIFFICULTY: 30,
    }
  };

  constructor() { }

  newGame() {
    this.questions = [];
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
        operand1: operand1,
        operand2: operand2,
        result: result,
        operationType: operationType
      };

      this.questions.push(question);
    }
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
