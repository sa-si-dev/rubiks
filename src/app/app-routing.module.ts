import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LevelsComponent } from './levels/levels.component';
import { LevelComponent } from './level/level.component';
import { LevelInstructionsComponent } from './level/instructions/level-instructions.component';
import { PlayComponent } from './play/play.component';
import { AlgorithmsComponent } from './algorithms/algorithms.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: 'levels', component: LevelsComponent, data: { animation: 'levels' } },
  { path: 'level/:id', component: LevelComponent, data: { animation: 'level' }, children: [
    { path: 'instructions', component: LevelInstructionsComponent, data: { animation: 'instructions' } },
  ]},
  { path: 'play', component: PlayComponent, data: { animation: 'play' }, children: [
    { path: 'algorithms', component: AlgorithmsComponent },
  ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
