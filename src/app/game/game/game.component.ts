import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/question.model';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  GAME_LENGTH = 10;
  MIN_DIFFICULTY = 2;
  MAX_DIFFICULTY = 20;

  correct = 0;
  questions: Question[] = [];

  constructor() { }

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
      // setTimeout(() => {
      //   this.initializeGame();
      // }, 2000);
      this.initializeGame();
    }
  }

  private initializeGame() {
    this.questions = [];
    for (let i = 0; i < this.GAME_LENGTH; i++) {
      const operand1 = this.getOperand();
      const operand2 = this.getOperand();

      const question: Question = {
        operand1: operand1,
        operand2: operand2,
        result: operand1 * operand2
      };

      this.questions.push(question);
    }
  }

  private getOperand(): number {
    const value = Math.random() * (this.MAX_DIFFICULTY - this.MIN_DIFFICULTY + 1) + this.MIN_DIFFICULTY;
    return Math.trunc(value);
  }

}
