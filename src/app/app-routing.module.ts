import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game/game.component';


const routes: Routes = [
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'game'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
