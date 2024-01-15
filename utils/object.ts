import * as THREE from 'three';

/**
 * This module has writed by phatdev
 */
export class Object3D {
  /**
   * new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
   * In three.js website. You can check out it below.
   */
  private POV = 75;
  private ASPECT = window.innerWidth/window.innerHeight;
  private NEAR = 0.1;
  private FAR = 1_000;

  /**
   * This code snippet is sampled from the three.js documentation page you can check it out right here.
   * https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
   */
  private  scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(this.POV, this.ASPECT, this.NEAR, this.FAR);
  private renderer = new THREE.WebGL1Renderer();

  // call base of 3d object
  public base: Base;
  /**
   * 
   * @param obj 
   * @param x 
   * @param y 
   * @returns 
   */
  constructor(obj: HTMLElement,  x: number, y: number) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.base = new Base(obj, x,  y, this.renderer, this.scene, this.camera);
  }
}

export class Base {
  /**
   * This method to append an obbject to the scene.
   * https://github.com/mrdoob/three.js/blob/dev/src/core/Object3D.js#L310
   * @param object 
   */
  public append(...object: THREE.Object3D<THREE.Object3DEventMap>[])  {
    type append = {
      scene: Object
    };
    const append = (this.append as unknown as append );
    append.scene = Object.create(this)['scene'];

   (append.scene as THREE.Scene).add(...object);
  }

  /**
   *  Create base of 3d object
   * @param obj 
   * @param x 
   * @param y 
   * @param renderer 
   */
  constructor(
    obj: HTMLElement, 
     x: number, 
     y: number,
     renderer:  THREE.WebGL1Renderer,
     scene: THREE.Scene,
     camera: THREE.PerspectiveCamera
  ) {
    const dom = renderer.domElement;
    dom.style.position = "absolute";
    dom.style.left = dom.style.top = this.valueResolve(0);

    Object.assign(this, {
      scene: scene,
      renderer: renderer,
      camera: camera
    });
    
    obj.appendChild(renderer.domElement);
  }
  
  /**
   * 
   * @param num 
   * @returns 
   */
  private valueResolve(num: number) {
    return `${num}`;
  }
}