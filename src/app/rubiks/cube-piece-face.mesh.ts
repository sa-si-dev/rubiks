import * as THREE from 'three';

const halfPi = Math.PI / 2;
const faceColors: any = {
  F: 0x283593,
  B: 0x2e7d32,
  L: 0xc62828,
  R: 0xff5722,
  U: 0xffffff,
  D: 0xffd600
};

const upSideDownFaceColors: any = {
  F: 0x283593,
  B: 0x2e7d32,
  L: 0xff5722,
  R: 0xc62828,
  U: 0xffd600,
  D: 0xffffff
};

export class CubePieceFaceMesh {
  face: string;
  color: any;
  mesh: any;
  size = 1;
  halfSize = 0.5;
  backSize = 0.45;
  
  positions: any = {
    F: [0, 0, this.halfSize],
    B: [0, 0, -this.halfSize],
    L: [-this.halfSize, 0, 0],
    R: [this.halfSize, 0, 0],
    U: [0, this.halfSize, 0],
    D: [0, -this.halfSize, 0]
  };

  backPositions: any = {
    F: [0, 0, this.backSize],
    B: [0, 0, -this.backSize],
    L: [-this.backSize, 0, 0],
    R: [this.backSize, 0, 0],
    U: [0, this.backSize, 0],
    D: [0, -this.backSize, 0]
  };

  rotations: any = {
    F: [0, 0, 0],
    B: [0, 0, 0],
    L: [0, halfPi, 0],
    R: [0, halfPi, 0],
    U: [halfPi, 0, 0],
    D: [halfPi, 0, 0]
  };

  constructor(face: string, isVisible: boolean, isHiddenPiece: boolean, upSideDown: boolean) {
    this.face = face;

    if (!isVisible) {
      this.color = 'black';
    } else if (isHiddenPiece) {
      this.color = 0x424242;
    } else {
      this.color = upSideDown ? upSideDownFaceColors[face] : faceColors[face];
    }

    this.create();
  }

  create() {
    let positions: number[] = this.positions[this.face];
    let backPositions: number[] = this.backPositions[this.face];
    let rotations: number[] = this.rotations[this.face];

    let faceShape = new THREE.Shape();
    let halfSize = this.halfSize;

    faceShape.moveTo(0, halfSize);
    faceShape.bezierCurveTo(halfSize, halfSize, halfSize, halfSize, halfSize, 0);
    faceShape.bezierCurveTo(halfSize, -halfSize, halfSize, -halfSize, 0, -halfSize);
    faceShape.bezierCurveTo(-halfSize, -halfSize, -halfSize, -halfSize, -halfSize, 0);
    faceShape.bezierCurveTo(-halfSize, halfSize, -halfSize, halfSize, 0, halfSize);

    let geometry = new THREE.ShapeBufferGeometry(faceShape);
    let material = new THREE.MeshBasicMaterial({ color: this.color, side: THREE.DoubleSide });
    material.color.convertSRGBToLinear();
   
    let faceMesh = new THREE.Mesh(geometry, material);
    faceMesh.position.set(positions[0], positions[1], positions[2]);
    faceMesh.rotation.set(rotations[0], rotations[1], rotations[2]);
    faceMesh.scale.set(0.9, 0.9, 0.9);

    let backMeshGeometry = new THREE.PlaneBufferGeometry(this.size, this.size);
    let backMeshMaterial = new THREE.MeshBasicMaterial({ color: 'black', side: THREE.DoubleSide });
    let backMesh = new THREE.Mesh(backMeshGeometry, backMeshMaterial);
    backMesh.position.set(backPositions[0], backPositions[1], backPositions[2]);
    backMesh.rotation.set(rotations[0], rotations[1], rotations[2]);
    
    this.mesh = new THREE.Group();
    this.mesh.add(backMesh, faceMesh);
    this.mesh.name = 'CubePieceFace';
    this.mesh.userData.face = this.face;
  }
}