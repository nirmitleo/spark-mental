import { Component, OnInit } from '@angular/core';
import { GameEngineService } from 'src/app/game-engine.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  correct = 0;

  constructor(
    public gameEngine: GameEngineService
  ) { }

  ngOnInit() {
    this.gameEngine.newGame();
  }

  onVerdictChange($event) {
    if ($event) {
      this.correct++;
    } else {
      this.correct--;
    }
    console.log(this.correct);

    if (this.correct === this.gameEngine.GAME_LENGTH) {
      console.log('game over!');
      this.gameEngine.newGame();
    }
  }

}
