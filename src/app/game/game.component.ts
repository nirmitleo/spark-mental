import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GameEngineService } from 'src/app/game-engine.service';
import { ChangedVerdict } from 'src/types/changed-verdict.type';
import { Verdict } from 'src/types/verdict.type';
import { QuestionComponent } from './question/question.component';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  constructor(public gameEngine: GameEngineService) {}

  ngOnInit() {
    this.gameEngine.newGame();
  }

  ngAfterViewInit() {
    this.autoFocusFirstQuestion();
  }

  onVerdictChange(verdictChange: ChangedVerdict) {
    this.gameEngine.onVerdictChange(verdictChange);

    if (this.gameEngine.questionsLeft === 0) {
      this.gameEngine.newGame();
      this.scrollToTop();
      this.autoFocusFirstQuestion();
    }

    if (verdictChange.verdict === Verdict.CORRECT) {
      this.autoFocusQuestion(verdictChange.serialID + 1);
    }
  }

  private scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  private autoFocusFirstQuestion() {
    this.autoFocusQuestion(0);
  }

  private autoFocusQuestion(serialID: number) {
    const question: QuestionComponent = this.questions.get(serialID);
    question?.focus();
  }
}
