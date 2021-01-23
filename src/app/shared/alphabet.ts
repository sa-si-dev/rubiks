import * as THREE from 'three';

export class Alphabet {
  letter: string;
  color: any;
  mesh: any;

  constructor(options: any) {
    this.color = options.color || 0xd9d3d3;
    this.letter = options.letter;

    this.create();
  }

  create() {
    let shape;

    switch (this.letter) {
      case 'F': shape = this.F(); break;
    }

    if (shape) {
      let geometry = new THREE.ShapeBufferGeometry(shape);
      let material = new THREE.MeshBasicMaterial({ color: this.color, side: THREE.DoubleSide });
      material.color.convertSRGBToLinear();
     
      this.mesh = new THREE.Mesh(geometry, material);
    }
  }

  F() {
    let faceShape = new THREE.Shape();

    faceShape.moveTo(-0.15, 0.28);
    faceShape.lineTo(0.15, 0.28);
    faceShape.lineTo(0.15, 0.22);
    faceShape.lineTo(-0.09, 0.22);
    faceShape.lineTo(-0.09, 0.04);
    faceShape.lineTo(0.12, 0.04);
    faceShape.lineTo(0.12, -0.02);
    faceShape.lineTo(-0.09, -0.02);
    faceShape.lineTo(-0.09, -0.26);
    faceShape.lineTo(-0.15, -0.26);
    faceShape.lineTo(-0.15, 0.28);
    
    return faceShape;
  }
}