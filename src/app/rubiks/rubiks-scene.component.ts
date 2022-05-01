import { Component, OnInit, OnDestroy, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { RubiksSceneService } from './rubiks-scene.service';
import { Utils } from '../shared/utils';

@Component({
  selector: 'rubiks-scene',
  templateUrl: './rubiks-scene.component.html',
  providers: [RubiksSceneService]
})
export class RubiksSceneComponent implements OnInit, OnDestroy {
  isSolved: boolean = false;

  @Input() mode: string = '';
  @Input() level: number = 0;
  @Input() disableRotation: boolean = false;
  @Input() noSound: boolean = false;
  @Input() backupKey: any;
  @Input() showRewind: boolean = false;
  @Input() showReplay: boolean = false;
  @Input() showUndo: boolean = false;
  @Output() showInstructions = new EventEmitter<any>();
  @Output() onRotate = new EventEmitter<any>();
  @Output() onSolved = new EventEmitter<any>();
  @Output() onRewind = new EventEmitter<any>();
  @Output() onReplay = new EventEmitter<any>();

  constructor(
    private eleRef: ElementRef,
    private rubiksSceneService: RubiksSceneService
  ) {}

  ngOnInit() {
    this.rubiksSceneService.init({
      container: this.eleRef.nativeElement.querySelector('.rubiks-scene-container'),
      sceneBg: 0x202029,
      disableRotation: this.disableRotation,
      cubeOptions: {
        level: this.level,
        noSound: this.noSound,
        backupKey: this.backupKey,
        onRotate: this._onRotate.bind(this),
        onSolved: this._onSolved.bind(this),
      }
    });
  }

  ngOnDestroy() {
    this.rubiksSceneService.pause();
  }

  resetCube(options: any = {}) {
    this.rubiksSceneService.cubeMesh.resetCube(options);
  }

  resetPlayData() {
    this.rubiksSceneService.cubeMesh.resetPlayData();
  }

  rotate(notation: string, soundOn: boolean = false) {
    this.rubiksSceneService.cubeMesh.rotate(notation, { soundOn: true });
  }

  onPan(e: any) {
    this.rubiksSceneService.onPan(e);
  }

  onScrambleClick() {
    this.isSolved = false;
    this.rubiksSceneService.cubeMesh.scramble();
  }

  onUndoClick() {
    this.rubiksSceneService.cubeMesh.undo();
  }

  onInfoClick() {
    this.showInstructions.emit();
  }

  _onRotate(notation: string) {
    this.onRotate.emit(notation);
  }

  _onSolved(notation: string) {
    this.isSolved = true;
    this.onSolved.emit(notation);
  }

  _onRewind() {
    this.onScrambleClick();
    this.onRewind.emit();
  }

  _onReplay() {
    this.isSolved = false;
    this.onReplay.emit();
  }
}