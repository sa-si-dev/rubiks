import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { instructionsData } from './instructions';
import { Utils } from '../../shared/utils';
import { RubiksSceneComponent } from 'src/app/rubiks/rubiks-scene.component';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'instruction',
  templateUrl: './level-instructions.component.html'
})
export class LevelInstructionsComponent implements OnInit, AfterViewInit {
  mode: string = 'instruction';
  level: number = 0;
  disableRotation: boolean = true;
  noSound: boolean = true;
  isFirstVisit: boolean = false;
  instructionsData: any;
  prevButtonEle: any;
  refreshButtonEle: any;
  nextButtonEle: any;
  defaultNotations: any;
  defaultRotation: any;

  @ViewChild(RubiksSceneComponent) rubiksSceneComponent:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.level =  parseInt(this.route.snapshot.parent?.params.id);
    this.instructionsData = instructionsData[this.level - 1];
    let visitedLevelKey = 'visitedLevel' + this.level;

    if (!this.db.get(visitedLevelKey, 'boolean')) {
      this.isFirstVisit = true;
      this.db.set(visitedLevelKey, true);
    }
  }

  ngAfterViewInit() {
    Utils.setSliderWidth();
    this.setActiveInstructions();

    this.prevButtonEle = document.querySelector('.prev-button');
    this.refreshButtonEle = document.querySelector('.refresh-button');
    this.nextButtonEle = document.querySelector('.next-button');

    Utils.initMoreShadow(document.querySelectorAll('.more-shadow-container'));
  }

  onResize() {
    Utils.setSliderWidth();
    this.setActiveInstructions();
  }

  onScroll() {
    this.setActiveInstructions();
  }

  setActiveInstructions() {
    let $activeBox = Utils.getActiveSlider();

    if ($activeBox) {
      let notations = $activeBox.getAttribute('data-notations');
      let displayNotations = $activeBox.getAttribute('data-display-notations');
      let rotation = $activeBox.getAttribute('data-rotation');
      let hideNotations = $activeBox.getAttribute('data-hide-notations');
      let $instructionNotations = document.querySelector('.instruction-notations');
      let $notationNav: any = document.querySelector('.notation-nav');

      if ($instructionNotations && $notationNav) {
        if ((notations || displayNotations) && !hideNotations) {
          $instructionNotations.innerHTML = Utils.getNotationsHtml(displayNotations || notations);
          $notationNav.classList.remove('hide');
        } else {
          $instructionNotations.innerHTML = '';
          $notationNav.classList.add('hide');
        }

        this.defaultRotation = rotation ? rotation.split(',') : null;

        this.resetCube(this.getDefaultNotations(notations));
      }
    }
  }

  getDefaultNotations(notations: any = []) {
    /* it would be used to revert previous default notations */
    let result = this.defaultNotations || [];

    if (notations) {
      this.defaultNotations = [];
      let defaultNotations = notations.split(',');
      
      /* splitting 2 times notation to two separate notations (F2 => F F) */
      defaultNotations.forEach((n: any) => {
        if (n.indexOf('2') !== -1) {
          n = n.replace('2', '');
          this.defaultNotations.push(n);
        }

        this.defaultNotations.push(n);
      });

      notations = this.defaultNotations.map((n: any) => Utils.inverseNotation(n)).reverse();
      result = result.concat(notations);
    } else {
      this.defaultNotations = [];
    }
    
    return result;
  }

  resetCube(defaultNotations: any = null) {
    this.rubiksSceneComponent.resetCube({defaultNotations, defaultRotation: this.defaultRotation});

    if (this.prevButtonEle) {
      this.prevButtonEle.classList.add('disabled');
      this.refreshButtonEle.classList.add('disabled');
      this.nextButtonEle.classList.remove('disabled');
    }
  }

  onPrevButtonClick(e: any) {
    let $activeNotation = document.querySelector('.instruction-notations span.active');
    let $prevNotation: any = $activeNotation ? $activeNotation.previousSibling : document.querySelector('.instruction-notations')?.lastElementChild;

    $activeNotation?.classList.remove('active');

    if ($prevNotation) {
      this.rotate($prevNotation.innerHTML, true);
      $prevNotation.classList.add('active');
      this.nextButtonEle.classList.remove('disabled');

      if (!$prevNotation.previousSibling) {
        this.prevButtonEle.classList.add('disabled');
        this.refreshButtonEle.classList.add('disabled');
      }
    }

    this.freezeButton(e.currentTarget);
  }

  onRefreshButtonClick() {
    let $activeNotation = document.querySelector('.instruction-notations span.active');

    $activeNotation?.classList.remove('active');
    document.querySelector('.instruction-notations')?.firstElementChild?.classList.add('active');

    this.resetCube();
  }

  onNextButtonClick(e: any) {
    let $activeNotation = document.querySelector('.instruction-notations span.active');

    if ($activeNotation) {
      let $nextNotation: any = $activeNotation.nextSibling;

      this.rotate($activeNotation.innerHTML);
      $activeNotation.classList.remove('active');

      if ($nextNotation) {
        $nextNotation.classList.add('active');
      } else {
        this.nextButtonEle.classList.add('disabled');
      }

      this.prevButtonEle.classList.remove('disabled');
      this.refreshButtonEle.classList.remove('disabled');
    }

    this.freezeButton(e.currentTarget);
  }

  onPlayClick() {
    this.router.navigate([`level/${this.level}`], { replaceUrl: true });
  }

  rotate(notation: string = '', inverse: boolean = false) {
    let doubleNotation = notation.indexOf('2') !== -1;

    if (doubleNotation) {
      notation = notation.replace('2', '');
    }

    if (inverse) {
      notation = Utils.inverseNotation(notation);
    }

    this.rubiksSceneComponent.rotate(notation);

    /* rotating second time once first one finished */
    if (doubleNotation) {
      setTimeout(() => {
        this.rubiksSceneComponent.rotate(notation);
      }, 250);
    }
  }

  freezeButton(ele: any) {
    ele.classList.add('processing');

    setTimeout(() => {
      ele.classList.remove('processing');
    }, 400);
  }
}