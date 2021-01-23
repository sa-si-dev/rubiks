import * as THREE from 'three';
import { CubePieceFaceMesh } from './cube-piece-face.mesh';
import { Alphabet } from '../shared/alphabet';

const cubePieceTypeMapping: any = {
  0: 'cubeCenter',
  1: 'center',
  2: 'edge',
  3: 'corner'
};

export class CubePieceMesh {
  id: any;
  pivot: any;
  mesh: any;
  currentPosition: any;
  visibleCubePieces: any;
  hiddenCubePieces: any;
  upSideDown: boolean;
  showFaceLetter: boolean;

  constructor(options: any) {
    this.currentPosition = options.position;
    this.visibleCubePieces = options.visibleCubePieces;
    this.hiddenCubePieces = options.hiddenCubePieces;
    this.upSideDown = options.upSideDown;
    this.showFaceLetter = options.showFaceLetter;
    this.create();
  }

  create() {
    let isFrontLayer = this.currentPosition.z === 1;
    let isBackLayer = this.currentPosition.z === -1;
    let isLeftLayer = this.currentPosition.x === -1;
    let isRightLayer = this.currentPosition.x === 1;
    let isUpperLayer = this.currentPosition.y === 1;
    let isDownLayer = this.currentPosition.y === -1;
    let isELayer = this.currentPosition.y === 0;

    this.mesh = new THREE.Group();
    this.mesh.userData.layers = [];
    
    if (isFrontLayer) {
      this.mesh.userData.layers.push('F');
    }

    if (isBackLayer) {
      this.mesh.userData.layers.push('B');
    }

    if (isLeftLayer) {
      this.mesh.userData.layers.push('L');
    }

    if (isRightLayer) {
      this.mesh.userData.layers.push('R');
    }

    if (isUpperLayer) {
      this.mesh.userData.layers.push('U');
    }

    if (isDownLayer) {
      this.mesh.userData.layers.push('D');
    }

    if (isELayer) {
      this.mesh.userData.layers.push('E');
    }

    /* excluding E layer, because it is not need to find the type */
    let visibleLayersCount = this.mesh.userData.layers.indexOf('E') !== -1 ? 
      (this.mesh.userData.layers.length - 1) : this.mesh.userData.layers.length;

    let cubePieceType = cubePieceTypeMapping[visibleLayersCount];
    this.mesh.userData.cubePieceType = cubePieceType;
    let isVisible;

    if (cubePieceType === 'cubeCenter' || this.isHidden()) {
      isVisible = false;
    } else if (cubePieceType === 'center' || this.isVisible()) {
      isVisible = true;
    }

    this.mesh.userData.isVisible = isVisible;
    let upSideDown = this.upSideDown;

    this.mesh.add(
      new CubePieceFaceMesh('F', isFrontLayer, !isVisible, upSideDown).mesh,
      new CubePieceFaceMesh('B', isBackLayer, !isVisible, upSideDown).mesh,
      new CubePieceFaceMesh('L', isLeftLayer, !isVisible, upSideDown).mesh,
      new CubePieceFaceMesh('R', isRightLayer, !isVisible, upSideDown).mesh,
      new CubePieceFaceMesh('U', isUpperLayer, !isVisible, upSideDown).mesh,
      new CubePieceFaceMesh('D', isDownLayer, !isVisible, upSideDown).mesh,
    );

    /* adding face letter to cube piece */
    if (this.showFaceLetter && isFrontLayer && cubePieceType === 'center') {
      let letterMesh = new Alphabet({ letter: 'F' }).mesh;
      letterMesh.position.z = 0.51;
      this.mesh.add(letterMesh);
    }

    this.pivot = new THREE.Group();
    this.pivot.name = 'CubePiecePivot';
    this.pivot.add(this.mesh);
    this.mesh.position.set(this.currentPosition.x, this.currentPosition.y, this.currentPosition.z);
    this.mesh.name = 'CubePiece';
    this.mesh.userData.currentPosition = this.mesh.userData.position = this.currentPosition;
    // this.setRandomPositionForLogo(this.mesh);
  }

  isVisible() {
    if (!this.visibleCubePieces) {
      return true;
    } else if (!this.visibleCubePieces.length) {
      return false;
    }

    let userData = this.mesh.userData;

    return this.visibleCubePieces.some((d: any) => {
      let splitArray = d.split('-');

      return userData.layers.indexOf(splitArray[0]) !== -1 && userData.cubePieceType === splitArray[1];
    });
  }

  isHidden() {
    if (!this.hiddenCubePieces) {
      return false;
    }

    let userData = this.mesh.userData;

    return this.hiddenCubePieces.some((d: any) => {
      let splitArray = d.split('-');

      return userData.layers.indexOf(splitArray[0]) !== -1 && userData.cubePieceType === splitArray[1];
    });
  }

  setRandomPositionForLogo(mesh: any) {
    let cubePieceType = this.mesh.userData.cubePieceType;
    let layers = this.mesh.userData.layers;

    if (cubePieceType === 'center' || cubePieceType === 'cubeCenter') {
      return;
    }

    mesh.rotation.x = getRandomRotation();
    mesh.rotation.y = getRandomRotation();
    mesh.rotation.z = getRandomRotation();
    
    if (layers.indexOf('R') !== -1 || layers.indexOf('L') !== -1) {
      mesh.translateX(getRandomPosition(layers.indexOf('R') !== -1));
    }

    if (layers.indexOf('U') !== -1 || layers.indexOf('D') !== -1) {
      mesh.translateY(getRandomPosition(layers.indexOf('U') !== -1));
    }

    if (layers.indexOf('F') !== -1 || layers.indexOf('B') !== -1) {
      mesh.translateZ(getRandomPosition(layers.indexOf('F') !== -1));
    }
    
    function getRandomRotation() {
      return Math.round(Math.random() * 5) / 100;
    }

    function getRandomPosition(sign: boolean) {
      return Math.round(Math.random() * 200) / 100 * (sign ? 1 : -1);
    }
  }
}