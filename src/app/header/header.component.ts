import { Component, OnInit } from '@angular/core';
import { GameEngineService } from '../game-engine.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public gameEngine: GameEngineService, public dialog: MatDialog) {}

  ngOnInit() {}

  openSettings() {
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.gameEngine.newGame();
    });
  }
}
