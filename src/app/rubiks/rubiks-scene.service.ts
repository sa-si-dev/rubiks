import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { CubeMesh } from './cube.mesh'; 

@Injectable()
export class RubiksSceneService {
  container: any;
  scene: any;
  camera: any;
  renderer: any;
  isPlaying: boolean = false;
  cubeMesh: any;
  raycaster: any;
  mouse: any;
  fromCubePiece: any;
  enableCubeRotation: boolean = false;
  disableRotation: boolean = false;
  containerLeftOffset: any;
  containerTopOffset: any;
  cubeOptions: any;

  constructor() {}
  
  init(options: any) {
    let boundingClientRect = options.container.getBoundingClientRect();
    this.disableRotation = options.disableRotation;
    this.enableCubeRotation = options.disableRotation;
    this.container = options.container;
    this.containerLeftOffset = boundingClientRect.left;
    this.containerTopOffset = boundingClientRect.top;
    this.cubeOptions = options.cubeOptions;
    
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(options.sceneBg);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
   
    this.createCamera();
    this.createLights();
    this.createMeshes();
    this.createRenderer();
    this.play();
  
    window.addEventListener('resize', this.onWindowResize.bind(this));

    /* calling it to reset dimension once more after route animation end */
    setTimeout(() => { this.onWindowResize(); }, 1000);
  }
    
  createCamera() {
    this.camera = new THREE.PerspectiveCamera(35, this.container.clientWidth / this.container.clientHeight, 0.1, 100);
    this.camera.position.set(0, 0, 17);
  }

  createLights() {
    // let ambientLight = new THREE.AmbientLight();
    // let mainLight = new THREE.DirectionalLight(0xffffff, 5);
    // mainLight.position.set(10, 10, 10);

    // this.scene.add(mainLight, ambientLight);
  }

  createMeshes() {
    this.cubeMesh = new CubeMesh(Object.assign({
      scene: this.scene,
    }, this.cubeOptions));
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.gammaFactor = 2.2;
    this.renderer.gammaOutput = true;
    this.renderer.physicallyCorrectLights = true;

    this.container.appendChild(this.renderer.domElement);
  }

  play() {
    this.renderer.setAnimationLoop(() => {
      this.update();
      this.render();
    });

    this.isPlaying = true;
  }

  pause() {
    this.renderer.setAnimationLoop(null);

    this.isPlaying = false;
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  update() {
    this.cubeMesh.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    let boundingClientRect = this.container.getBoundingClientRect();

    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.containerLeftOffset = boundingClientRect.left;
    this.containerTopOffset = boundingClientRect.top;
  }

  onPan(e: any) {
    if (e.type === 'panstart' && !this.disableRotation) {
      this.mouse.x = ((e.center.x - this.containerLeftOffset) / this.container.clientWidth) * 2 - 1;
      this.mouse.y = - ((e.center.y - this.containerTopOffset) / this.container.clientHeight) * 2 + 1;
      let intersectResult = this.getIntersectCubePiece();

      if (intersectResult) {
        this.fromCubePiece = intersectResult.cubePiece;
        this.enableCubeRotation = false;
      } else {
        this.enableCubeRotation = true;
      }
    } else if (e.type === 'panmove') {
      if (this.fromCubePiece) {
        this.mouse.x = ((e.center.x - this.containerLeftOffset) / this.container.clientWidth) * 2 - 1;
        this.mouse.y = - ((e.center.y - this.containerTopOffset) / this.container.clientHeight) * 2 + 1;
        let intersectResult = this.getIntersectCubePiece();

        if (intersectResult && this.fromCubePiece.userData.id !== intersectResult.cubePiece.userData.id) {
          this.cubeMesh.rotateByIntersect(this.fromCubePiece, intersectResult.cubePiece, intersectResult.selectedFace);
          this.fromCubePiece = null;
        }
      } else if (this.enableCubeRotation) {
        this.cubeMesh.rotateCube(e);
      }
     } else if (e.type === 'panend') {
      this.fromCubePiece = null;

      if (!this.disableRotation) {
        this.enableCubeRotation = false;
      }
    }
  }

  getIntersectCubePiece() {
    this.raycaster.setFromCamera(this.mouse, this.camera );
    let result;

    let intersectObjects = this.raycaster.intersectObjects(this.scene.children, true)
      .filter((d: any) => d.object.type === 'Mesh');
    let intersectCubePieceFace = intersectObjects.filter((d: any) => d.object.parent.name === 'CubePieceFace')
      .sort((a: any, b: any) => a.distance - b.distance)[0];
    let intersectCubeFace = intersectObjects.filter((d: any) => d.object.name === 'CubeFace')
      .sort((a: any, b: any) => a.distance - b.distance)[0];

    if (intersectCubePieceFace) {
      result = {
        cubePiece: intersectCubePieceFace.object.parent.parent,
        selectedFace: intersectCubeFace.object.userData.face
      };
    }

    return result;
  }
}

