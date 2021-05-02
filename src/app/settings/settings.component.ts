import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameEngineService } from '../game-engine.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  min: string;
  max: string;

  constructor(
    public gameEngineService: GameEngineService, // force break
    public dialogRef: MatDialogRef<SettingsComponent>
  ) {
    this.min = this.gameEngineService.MIN + '';
    this.max = this.gameEngineService.MAX + '';
  }

  ngOnInit(): void {}

  onMinValueChange(value) {
    try {
      this.min = value;
      this.gameEngineService.MIN = parseInt(this.min, 10);
    } catch (e) {
      console.error('Not a valid value for min');
    }
  }
  onMaxValueChange(value) {
    try {
      this.max = value;
      this.gameEngineService.MAX = parseInt(this.max, 10);
    } catch (e) {
      console.error('Not a valid value for max');
    }
  }
}
