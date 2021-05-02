import { Component, OnInit } from '@angular/core';
import { GameEngineService } from '../game-engine.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public gameEngine: GameEngineService) { }

  ngOnInit() {
  }

  openSettings() {
    alert('This doesn\'t work!');
  }

}
