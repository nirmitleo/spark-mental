import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameEngineService } from 'src/app/game-engine.service';
import { ChangedVerdict } from 'src/types/changed-verdict.type';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  correct = 0;

  @ViewChild('container', { read: ElementRef, static: false }) containerElementRef;
  constructor(public gameEngine: GameEngineService) {}

  ngOnInit() {
    this.gameEngine.newGame();
  }

  onVerdictChange(verdictChange: ChangedVerdict) {
    this.gameEngine.onVerdictChange(verdictChange);
    if (this.gameEngine.questionsLeft === 0) {
      this.gameEngine.newGame();
      this.scrollToTop();
    }
  }

  private scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
