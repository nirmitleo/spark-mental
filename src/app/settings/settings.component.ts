import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameEngineService } from '../game-engine.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  minOperand1: string;
  maxOperand1: string;
  minOperand2: string;
  maxOperand2: string;

  constructor(
    public gameEngineService: GameEngineService, // force break
    public dialogRef: MatDialogRef<SettingsComponent>
  ) {
    this.minOperand1 = this.gameEngineService.MIN_OPERAND1 + '';
    this.maxOperand1 = this.gameEngineService.MAX_OPERAND1 + '';
    this.minOperand2 = this.gameEngineService.MIN_OPERAND2 + '';
    this.maxOperand2 = this.gameEngineService.MAX_OPERAND2 + '';
  }

  ngOnInit(): void {}

  onValueChange(value: string, operandType: 'operand1' | 'operand2', rangeType: 'min' | 'max') {
    if (!this.isInteger(value)) {
      return;
    }
    if (rangeType === 'min') {
      if (operandType === 'operand1') {
        this.gameEngineService.MIN_OPERAND1 = parseInt(value, 10);
      } else {
        this.gameEngineService.MIN_OPERAND2 = parseInt(value, 10);
      }
    } else {
      if (operandType === 'operand1') {
        this.gameEngineService.MAX_OPERAND1 = parseInt(value, 10);
      } else {
        this.gameEngineService.MAX_OPERAND2 = parseInt(value, 10);
      }
    }
  }

  private isInteger(value: string): boolean {
    try {
      parseInt(value, 10);
      return true;
    } catch (error) {
      return false;
    }
  }
}
