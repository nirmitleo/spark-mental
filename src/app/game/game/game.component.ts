import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/question.model';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  GAME_LENGTH = 10;
  MIN_DIFFICULTY = 9;
  MAX_DIFFICULTY = 13;

  correct = 0;
  questions: Question[] = [];

  constructor() {}

  ngOnInit() {
    this.initializeGame();
  }
  onVerdictChange($event) {
    if ($event) {
      this.correct++;
    } else {
      this.correct--;
    }
    console.log(this.correct);

    if (this.correct === this.GAME_LENGTH) {
      console.log('game over!');
      setTimeout(() => {
        this.initializeGame();
      }, 2000);
    }
  }

  private initializeGame() {
    this.correct = 0;
    this.questions = [];
    for (let i = 0; i < this.GAME_LENGTH; i++) {
      const [operand1, operand2] = this.getIntegerOperand();
      const question: Question = {
        operand1,
        operand2,
        result: operand1 * operand2,
      };

      this.questions.push(question);
    }
  }

  private getIntegerOperand(): [number, number] {
    const operand1 = this.getIntegerRandomValue(2, 20);
    const operand2 = this.getIntegerRandomValue(this.MIN_DIFFICULTY, this.MAX_DIFFICULTY);

    const integerOperands = this.shuffle(operand1, operand2);
    return integerOperands;
  }

  private shuffle(operand1: number, operand2: number): [number, number] {
    return Math.trunc(Math.random() * 100) % 2 === 0 ? [operand1, operand2] : [operand2, operand1];
  }

  private getIntegerRandomValue(minRange: number, maxRange: number) {
    let randomInt = Math.random() * (maxRange - minRange + 1) + minRange;
    randomInt = Math.trunc(randomInt);
    return randomInt;
  }
}
