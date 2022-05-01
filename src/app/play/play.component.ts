import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../shared/database.service';
import { Utils } from '../shared/utils';
import { RubiksSceneComponent } from 'src/app/rubiks/rubiks-scene.component';

@Component({
  selector: 'play',
  templateUrl: './play.component.html'
})
export class PlayComponent implements AfterViewInit {
  mode: string = 'play';
  backupKey: string = 'play';
  currentTimeLabel: any;
  currentTimeText: any;
  bestTimeLabel: any;
  bestTimeText: any;
  solvedMessage: any;

  @ViewChild(RubiksSceneComponent) rubiksScene:any;

  constructor(
    private router: Router,
    private db: DatabaseService
  ) {}

  ngAfterViewInit() {
    if (this.db.get(`${this.backupKey}-backup`)) {
      Utils.showModal('play-restore-modal');
    }
  }

  onResetClick() {
    this.rubiksScene.resetCube();
    this.rubiksScene.resetPlayData();
  }

  onAlgorithmsLinkClick(e: any) {
    if (e.tapCount > 1) {
      this.router.navigate(['/play/algorithms']);
    }
  }

  onSolved() {
    let $playTimerValue: any = document.querySelector('#play-timer-value');
    let currentTime = $playTimerValue.dataset.duration;
    let bestTime = this.db.get('playBestTime', 'number');

    this.currentTimeText = $playTimerValue.innerHTML;
    this.bestTimeText = Utils.getTimerText(bestTime);

    /* for first time solve */
    if (!bestTime) {
      this.solvedMessage = 'Solved';
      this.currentTimeLabel = 'Time';
      this.bestTimeLabel = '';
      this.db.set('playBestTime', currentTime);
    } else if (currentTime < bestTime) {
      /* for new best time */
      this.solvedMessage = 'New Best Time';
      this.currentTimeLabel = 'Best Time';
      this.bestTimeLabel = 'Last Best Time';
      this.db.set('playBestTime', currentTime);
    } else {
      this.solvedMessage = 'Solved';
      this.currentTimeLabel = 'Current Time';
      this.bestTimeLabel = 'Best Time';
    }

    Utils.showModal('play-page-modal');
  }
}