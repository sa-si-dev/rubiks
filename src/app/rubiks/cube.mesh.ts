import * as THREE from 'three';
import { CubePieceMesh } from './cube-piece.mesh';
import { Utils } from '../shared/utils';
import { CubeFaceMesh } from './cube-face.mesh';
import * as cubeConst from './cube-constants';

export class CubeMesh {
  scene: any;
  mesh: any;
  size = 3;
  cubePieces: any[] = [];
  matrixRotateMapping = Utils.getMatrixRotateMapping();
  activeNotation: any;
  rotationAngle: number = 0;
  rotateClockwise: boolean = true;
  hasAnimation: boolean = false;
  isScrambled: boolean = false;
  noSound: boolean = false;
  speed: number = cubeConst.defaultSpeed;
  rotationsHistory: Array<string> = [];
  allRotationsHistory: Array<string> = [];
  playTimerValue: number = 0;
  playTimerInterval: any;
  level: number;
  upSideDown: boolean;
  defaultRotation: any = [0.3, -0.3, 0];
  backupKey: any;
  onRotate: any;
  onSolved: any;

  constructor(options: any) {
    this.scene = options.scene;
    this.level = options.level;
    this.onRotate = options.onRotate;
    this.onSolved = options.onSolved;
    this.noSound = options.noSound;
    this.backupKey = options.backupKey;
    this.upSideDown = cubeConst.upSideDownLevels.indexOf(this.level) !== -1;

    this.create();
  }

  create() {
    let size = this.size;
    let positionDiff = Math.floor(size / 2);

    this.mesh = new THREE.Group();
    this.mesh.name = 'Cube';

    let visibleCubePieces: any = cubeConst.visibleCubePiecesData[this.level];
    let hiddenCubePieces: any = cubeConst.hiddenCubePiecesData[this.level];
    let showFaceLetter: boolean = this.level == 1;

    for (let i = 0; i < size * size * size; i++) {
      let positionX = (i % size) - positionDiff;
      let positionY = size - 1 - positionDiff - Math.floor((i % (size * size)) / size);
      let positionZ = Math.floor(i / (size * size)) - 1;

      if (positionZ !== 0) {
        positionZ *= -1;
      }
     
      let cubePiece = new CubePieceMesh({
        position: {x: positionX, y: positionY, z:positionZ},
        visibleCubePieces,
        hiddenCubePieces,
        showFaceLetter,
        upSideDown: this.upSideDown,
      });

      cubePiece.mesh.userData.id = `cube-piece-${i}`;
      this.mesh.add(cubePiece.pivot);
      this.cubePieces.push(cubePiece);
    }

    this.mesh.add(
      new CubeFaceMesh('F').mesh,
      new CubeFaceMesh('B').mesh,
      new CubeFaceMesh('L').mesh,
      new CubeFaceMesh('R').mesh,
      new CubeFaceMesh('U').mesh,
      new CubeFaceMesh('D').mesh,
    );

    this.scene.add(this.mesh);
    this.restore();
  }

  rotateCube(e: any) {
    let speed = Math.abs(e.velocity / 0.1);
    let angle = Math.PI / 100 * speed;
    let axisVector;
    let inverse

    if (e.direction === 2) {
      axisVector = new THREE.Vector3(0, 1, 0);
      inverse = true;
    } else if (e.direction === 4) {
      axisVector = new THREE.Vector3(0, 1, 0);
    } else if (e.direction === 8) {
      axisVector = new THREE.Vector3(1, 0, 0);
      inverse = true;
    } else if (e.direction === 16) {
      axisVector = new THREE.Vector3(1, 0, 0);
    }

    if (inverse) {
      angle *= -1;
    }

    if (axisVector) {
      this.mesh.rotateOnWorldAxis(axisVector, angle);
    }

    if (this.playTimerValue) {
      this.resumeTimer();
    }
  }

  rotate(notation: string, { noTimer = false, noAnimation = false, noSound = false, soundOn = false, soundSpeed = 1 } = {}) {
    if (this.hasAnimation || !notation) {
      return;
    }

    notation = notation.toUpperCase();
    let {axis, index, inverse} = cubeConst.notationData[notation];
    this.activeNotation = notation;

    this.cubePieces.forEach(cubePiece => {
      let matrixRotateMapping = (axis === 'y' ? !inverse : inverse) ? this.matrixRotateMapping.clockwise : this.matrixRotateMapping.antiClockwise;
      let currentPosition = cubePiece.currentPosition;
      let currentPositionX = currentPosition.x;
      let currentPositionY = currentPosition.y;
      let currentPositionZ = currentPosition.z;
      let newPosition;
      
      /* set new position as current position */
      if (currentPosition[axis] === index) {
        if (axis === 'x') {
          newPosition = matrixRotateMapping[this.matrixRotateMapping.normal.findIndex(v => v === `${currentPositionY} ${currentPositionZ}`)].split(' ');
          currentPositionY = newPosition[0];
          currentPositionZ = newPosition[1];
        } else if (axis === 'y') {
          newPosition = matrixRotateMapping[this.matrixRotateMapping.normal.findIndex(v => v === `${currentPositionX} ${currentPositionZ}`)].split(' ');
          currentPositionX = newPosition[0];
          currentPositionZ = newPosition[1];
        } else {
          newPosition = matrixRotateMapping[this.matrixRotateMapping.normal.findIndex(v => v === `${currentPositionX} ${currentPositionY}`)].split(' ');
          currentPositionX = newPosition[0];
          currentPositionY = newPosition[1];
        }

        cubePiece.mesh.userData.currentPosition = cubePiece.currentPosition = {
          x: parseFloat(currentPositionX),
          y: parseFloat(currentPositionY),
          z: parseFloat(currentPositionZ)
        };
      }
    });

    this.rotationAngle = 0;
    this.rotateClockwise = inverse;

    if (noAnimation) {
      this.rotationUpdate(1);
    } else {
      this.hasAnimation = true;
    }

    if (!noTimer && this.isScrambled) {
      this.resumeTimer();
    }

    this.allRotationsHistory.push(notation);

    if ((!this.noSound || soundOn) && !noSound) {
      Utils.playRubiksSound(soundSpeed);
    }
  }

  rotationUpdate(speed: any = null) {
    let rotationSpeed = cubeConst.halfPi / (speed || this.speed);
    let {axis, index} = cubeConst.notationData[this.activeNotation];
    let angle = this.rotateClockwise ? rotationSpeed : -rotationSpeed;
    let axisVector: any;

    if (axis === 'x') {
      axisVector = new THREE.Vector3(1, 0, 0);
    } else if (axis === 'y') {
      axisVector = new THREE.Vector3(0, 1, 0);
    } else {
      axisVector = new THREE.Vector3(0, 0, 1);
    }

    this.rotationAngle += rotationSpeed;

    if (this.rotationAngle <= cubeConst.halfPi) {
      this.cubePieces.forEach(cubePiece => {
        if (cubePiece.currentPosition[axis] === index) {
          cubePiece.pivot.rotateOnWorldAxis(axisVector, angle);
        }
      });
    }

    if (this.rotationAngle >= cubeConst.halfPi) {
      this.hasAnimation = false;
      this.isSolved();
    }
  }

  update() {
    if (this.hasAnimation) {
      this.rotationUpdate();
    }
  }

  rotateByIntersect(fromCubePiece: any, toCubePiece: any, selectedFace: string) {
    let fromPosition = fromCubePiece.userData.currentPosition;
    let toPosition = toCubePiece.userData.currentPosition;
    let changedAxis: string = '';

    if (fromPosition.x !== toPosition.x) {
      changedAxis = 'x';
    } else if (fromPosition.y !== toPosition.y) {
      changedAxis = 'y';
    } else if (fromPosition.z !== toPosition.z) {
      changedAxis = 'z';
    }

    let notationMapping = cubeConst.gestureNotationData[selectedFace][changedAxis];

    if (notationMapping) {
      let notation = notationMapping.notations[fromPosition[notationMapping.fixedAxis] + 1];

      if (notationMapping.inverse) {
        notation = Utils.inverseNotation(notation);
      }

      if (fromPosition[changedAxis] > toPosition[changedAxis]) {
        notation = Utils.inverseNotation(notation);
      }

      this.rotate(notation);
      this.rotationsHistory.push(notation);
      this.toggleUndoButton(true);
      this.backup();

      if (this.onRotate) {
        this.onRotate(notation);
      }
    }
  }

  scramble() {
    let axisNotations = ['M', 'MI', 'E', 'EI', 'S', 'SI'];
    let notations = Object.keys(cubeConst.notationData).filter(d => axisNotations.indexOf(d) === -1);
    let noOfNotations = 40;
    let i = 1;
    let soundOnInterval = 2;
    this.speed = cubeConst.fastSpeed;

    let timer = setInterval(() => {
      let noSound = (i % soundOnInterval) !== 0;
      this.rotate(notations[Math.floor(Math.random() * notations.length)], { noTimer: true, noSound: noSound, soundSpeed: 3 });

      if (++i > noOfNotations) {
        clearInterval(timer);
        this.speed = cubeConst.defaultSpeed;
        this.isScrambled = true;
      }
    }, 80);

    this.resetPlayData();
  }

  resetCube({
    defaultNotations = null as any,
    defaultRotation = null as any,
    isScrambled = false as boolean,
    disableReverse = false as boolean,
    resetHistory = false as boolean,
  } = {}) {
    this.isScrambled = false;

    if (!defaultRotation) {
      defaultRotation = this.defaultRotation;
    }

    this.mesh.rotation.set(...defaultRotation);

    if (!disableReverse) {
      this.allRotationsHistory.reverse().forEach((notation: string) => {
        this.rotate(Utils.inverseNotation(notation), { noTimer: true, noAnimation: true, noSound: true });
      });
    }

    if (defaultNotations) {
      defaultNotations.forEach((notation: string) => {
        this.rotate(notation, { noTimer: true, noAnimation: true, noSound: true });
      });
    }

    if (isScrambled) {
      this.isScrambled = true;
    }

    if (resetHistory) {
      this.rotationsHistory = [];
    }

    this.allRotationsHistory = [];
  }
  
  undo() {
    if (!this.hasAnimation) {
      this.rotate(Utils.inverseNotation(this.rotationsHistory.pop()));
      this.toggleUndoButton(this.rotationsHistory.length > 0);
    }
  }

  toggleUndoButton(enable: boolean) {
    let $undoButton = document.querySelector('.undo-button');
    
    if ($undoButton) {
      $undoButton.classList.toggle('disabled', !enable);
    }
  }

  isSolved() {
    if (!this.isScrambled) {
      return;
    }

    let firstVisibleCubePiece = this.cubePieces[0];

    this.cubePieces.some(cubePiece => {
      let userData = cubePiece.mesh.userData;
      
      if (userData.isVisible && (userData.cubePieceType === 'corner' || userData.cubePieceType === 'edge')) {
        firstVisibleCubePiece = cubePiece;
        return true;
      }

      return;
    });

    let rotation = this.getRotations(firstVisibleCubePiece.pivot.rotation);

    let isSolved = !this.cubePieces.some(cubePiece => {
      let userData = cubePiece.mesh.userData;

      /* need not to validate hidden cube piece */
      if (!userData.isVisible) {
        return false;
      }

      let _rotation = this.getRotations(cubePiece.pivot.rotation);
      let notInPlace;

      if (userData.cubePieceType === 'center') {
        notInPlace = this.isCenterPieceNotInPlace(userData);
      } else {
        notInPlace = rotation.x !== _rotation.x || rotation.y !== _rotation.y || rotation.z !== _rotation.z;
      }

      return notInPlace;
    });

    if (isSolved) {
      this.stopTimer();
      this.isScrambled = false;

      setTimeout(() => {
        localStorage.removeItem(`${this.backupKey}-backup`);
        this.onSolved();
      }, 500)
    }
  }

  isCenterPieceNotInPlace(userData: any) {
    let { axis, index } = this.getCenterPiecePosition(userData.position);
    let { axis: currentAxis, index: currentIndex } = this.getCenterPiecePosition(userData.currentPosition);

    return this.cubePieces.some(cubePiece => {
      let _userData = cubePiece.mesh.userData;
      let position = _userData.position;
      let currentPosition = _userData.currentPosition;

      /* checking that if center piece's current position is different from its layer's visible edge piece's current position */
      return (_userData.isVisible && _userData.cubePieceType === 'edge' && position[axis] === index &&
        currentPosition[currentAxis] !== currentIndex);
    });
  }

  getCenterPiecePosition(position: any) {
    let axis;
    let index;

    if (position.x !== 0) {
      axis = 'x';
      index = position.x;
    } else if (position.y !== 0) {
      axis = 'y';
      index = position.y;
    } else {
      axis = 'z';
      index = position.z;
    }

    return { axis, index };
  }

  getRotations(rotation: any) {
    let roundValue = function(v: number) {
      v = parseFloat(v.toFixed(2));

      /* 3.14 = Math.PI */
      if (v === -3.14) {
        v = 3.14;
      }

      return v;
    }

    return {
      x: roundValue(rotation.x),
      y: roundValue(rotation.y),
      z: roundValue(rotation.z)
    };
  }

  backup() {
    if (!this.backupKey || !this.isScrambled) {
      return;
    }

    let rotationDuration = 200;
    let playBackup = {
      allRotationsHistory: this.allRotationsHistory,
      rotationsHistory: this.rotationsHistory,
      playTimerValue: this.playTimerValue + rotationDuration
    };

    localStorage.setItem(`${this.backupKey}-backup`, JSON.stringify(playBackup));
  }

  restore() {
    let backupData: any;

    if (this.backupKey) {
      backupData = localStorage.getItem(`${this.backupKey}-backup`);

      if (backupData) {
        backupData = JSON.parse(backupData);
      }
    }
    
    if (backupData && backupData.playTimerValue) {
      this.resetCube({defaultNotations: backupData.allRotationsHistory});
      this.allRotationsHistory = backupData.allRotationsHistory;
      this.rotationsHistory = backupData.rotationsHistory;
      this.playTimerValue = backupData.playTimerValue;
      this.isScrambled = true;

      setTimeout(() => { this.toggleUndoButton(true); }, 500);
      setTimeout(() => { this.resumeTimer(); }, 300);
      setTimeout(() => { this.pauseTimer(); }, 311);
    } else {
      this.resetCube();
    }
  }

  resetPlayData() {
    this.rotationsHistory = [];
    this.resetTimer();
    this.toggleUndoButton(false);
    localStorage.removeItem(`${this.backupKey}-backup`);
  }

  /* timer methods - start */
  pauseTimer() {
    clearInterval(this.playTimerInterval);
    this.playTimerInterval = null;
  }

  resumeTimer() {
    if (!this.playTimerInterval) {
      this.updateTimer();
    }
  }

  updateTimer() {
    let $playTimerValue: any = document.querySelector('#play-timer-value');
    
    this.playTimerInterval = setInterval(() => {
      this.playTimerValue += 10;

      if ($playTimerValue) {
        $playTimerValue.innerHTML = Utils.getTimerText(this.playTimerValue);
        $playTimerValue.dataset.duration = this.playTimerValue;
      }
    }, 10);
  }

  stopTimer() {
    this.pauseTimer();
    this.playTimerValue = 0;
  }

  resetTimer() {
    let $playTimerValue = document.querySelector('#play-timer-value');
    
    if ($playTimerValue) {
      this.stopTimer();
      $playTimerValue.innerHTML = '';
    }
  }
  /* timer methods - end */
}