import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { routeAnimations } from '../shared/animations';
import { DatabaseService } from '../shared/database.service';
import { Utils } from '../shared/utils';
import { RubiksSceneComponent } from '../rubiks/rubiks-scene.component';
import * as levelConst from './level-constants';

@Component({
  selector: 'level',
  templateUrl: './level.component.html',
  animations: [
    routeAnimations
  ]
})
export class LevelComponent implements OnInit, AfterViewInit {
  mode: string = 'level';
  level: number = 0;
  randomNotations: Array<string> = [];
  currentNotation: string = '';
  currentNotationIndex: number = 0;
  correctScore: number = 0;
  incorrectScore: number = 0;
  isCompleted: boolean = false;
  modalTitle: any;
  modalMessage: any;
  modalPrimayActionText: any;
  showNextLevel: boolean = false;
  showRewind: boolean = false;
  showReplay: boolean = false;
  showUndo: boolean = false;

  @ViewChild(RubiksSceneComponent) rubiksSceneComponent!:RubiksSceneComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.level = parseInt(this.route.snapshot.params.id);

    if (this.level === 1) {
      this.setRandomNotations();
      this.setNextNotation();
    } else {
      if (this.level !== 2) {
        this.showRewind = true;
      }

      this.showUndo = true;
    }
  }

  ngAfterViewInit() {
    if (this.level !== 1) {
      this.scrambleLevel();
    }

    if (!this.db.get('visitedLevel' + this.level, 'boolean')) {
      this.showInstructions(true);
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  scrambleLevel() {
    let defaultNotations: any;

    if (this.level === 2) {
      defaultNotations = Utils.getRandomNotaions(true);
    } else {
      defaultNotations = this.getLevelNotations();
    }

    this.rubiksSceneComponent.resetCube({defaultNotations, isScrambled: true, disableReverse: true, resetHistory: true});
  }

  getLevelNotations() {
    let levelNotations: any = levelConst.levelNotations[this.level];
    let result: any = [];
    
    if (this.level === 3 || this.level === 4) {
      let skipSides = this.getSkipSides();

      for (let i = 0; i < 30; i++) {
        let multipleSideNotations: any = [];
        let randomTimes = Math.floor(Math.random() * 3) + 1;
        let sideNotations: any = Utils.shuffleArray(levelNotations);
        sideNotations = sideNotations.flat();
  
        for (let j = 0; j < randomTimes; j++) {
          multipleSideNotations = multipleSideNotations.concat(sideNotations);
        }
  
        if (!skipSides || skipSides.indexOf(i) === -1) {
          multipleSideNotations = Utils.rotateNotaions(multipleSideNotations, i);
        }
  
        result = result.concat(multipleSideNotations);
      }
    } else {
      let randomSide = Math.floor(Math.random() * 4);
      result = Utils.rotateNotaions(levelNotations, randomSide);
    }

    return result;
  }

  getSkipSides() {
    let skipSides;

    if (this.level === 3) {
      let sideOne = Math.floor(Math.random() * 4);
      skipSides = [];
      skipSides.push(sideOne);
      skipSides.push((sideOne + 2) % 4);
    } else {
      skipSides = levelConst.skipSides[this.level];
    }

    return skipSides;
  }

  replay() {
    if (this.level !== 2) {
      this.showRewind = true;
    }

    this.showUndo = true;
    this.showReplay = false;
    this.scrambleLevel();
  }

  rewind() {
    this.showRewind = false;
  }

  showInstructions(replaceUrl: boolean = false) {
    this.router.navigate(['instructions'], { relativeTo: this.route, replaceUrl: replaceUrl });
  }

  setRandomNotations() {
    this.randomNotations = ['M', 'Mi', ...Utils.getRandomNotaions(), 'Mi', 'M'];
  }

  setNextNotation(isRetry: boolean = false) {
    this.currentNotation = this.randomNotations[this.currentNotationIndex++];

    if (!this.currentNotation && !isRetry) {
      this.isSolved();
    }
  }

  onRotate(notation: string) {
    if (this.isCompleted || this.level !== 1) {
      if (this.level !== 1) {
        this.showRewind = false;
      }

      return;
    }

    if (notation == this.currentNotation.toUpperCase()) {
      this.correctScore++;
      this.setScoreAnimation(true);
    } else {
      this.incorrectScore++;
      this.setScoreAnimation(false);
    }

    this.setNextNotation();
  }

  setScoreAnimation(isCorrect: boolean) {
    let $ele = isCorrect ? document.querySelector('.result-container.correct') : document.querySelector('.result-container.incorrect');
    let animationClass = $ele ? $ele.getAttribute('data-animation-class') || '' : '';
    
    $ele?.classList.remove(animationClass);
    setTimeout(() => { $ele?.classList.add(animationClass); }, 100);
  }

  isSolved() {
    if (this.incorrectScore) {
      this.modalTitle = 'Try Again';
      this.modalMessage = `You have made ${this.incorrectScore} wrong ${this.incorrectScore === 1 ? 'move' : 'moves'}.`;
      this.modalPrimayActionText = 'Play Again';

      setTimeout(() => {
        Utils.showModal('level-page-modal');
      }, 500);
    } else {
      setTimeout(() => {
        this.onSolved();
      }, 500);
    }

    this.isCompleted = true;
  }

  onRetryClick() {
    this.isCompleted = false;
    this.correctScore = 0;
    this.incorrectScore = 0;
    this.currentNotationIndex = 0;

    this.setRandomNotations();
    this.setNextNotation(true);
    this.rubiksSceneComponent.resetCube();
  }

  onSolved() {
    let levelsCompleted = this.db.get('levelsCompleted', 'number');
    this.modalTitle = 'Solved';

    if (levelsCompleted < this.level) {
      if (this.level === 6) {
        this.modalMessage  = 'Congrats! You have solved all levels';
        this.modalPrimayActionText = 'Play Again';
      } else {
        this.modalMessage = `You have solved level ${this.level}`;
        this.modalPrimayActionText = 'Next Level';
        this.showNextLevel = true;
      }

      this.db.set('levelsCompleted', this.level);
    } else {
      this.modalMessage  = `You have solved level ${this.level} again`;
      this.modalPrimayActionText = 'Play Again';
      this.showNextLevel = false;
    }

    if (this.level !== 1) {
      this.showReplay = true;
      this.showUndo = false;
    }

    Utils.showModal('level-page-modal');
  }

  modalPrimayAction(e: any) {
    if (this.showNextLevel) {
      Utils.freezePage(e.target);
      location.replace('/level/' + (this.level + 1) + '/instructions');
    } else {
      Utils.hideModal('level-page-modal');

      if (this.level === 1) {
        this.onRetryClick();
      } else {
        this.replay();
      }
    }
  }
}