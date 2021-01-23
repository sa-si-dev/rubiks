import * as THREE from 'three';

const halfPi = Math.PI / 2;

export class CubeFaceMesh {
  face: string;
  mesh: any;
  size = 3;
  halfSize = 1.5;
  positions: any = {
    F: [0, 0, this.halfSize],
    B: [0, 0, -this.halfSize],
    L: [-this.halfSize, 0, 0],
    R: [this.halfSize, 0, 0],
    U: [0, this.halfSize, 0],
    D: [0, -this.halfSize, 0]
  };

  rotations: any = {
    F: [0, 0, 0],
    B: [0, 0, 0],
    L: [0, halfPi, 0],
    R: [0, halfPi, 0],
    U: [halfPi, 0, 0],
    D: [halfPi, 0, 0]
  };

  constructor(face: string) {
    this.face = face;
    this.create();
  }

  create() {
    let positions: number[] = this.positions[this.face];
    let rotations: number[] = this.rotations[this.face];

    let geometry = new THREE.PlaneBufferGeometry(this.size, this.size);
    let material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide });
   
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(positions[0], positions[1], positions[2]);
    this.mesh.rotation.set(rotations[0], rotations[1], rotations[2]);
    this.mesh.name = 'CubeFace';
    this.mesh.userData.face = this.face;
  }
}