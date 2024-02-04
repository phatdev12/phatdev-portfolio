import * as THREE from 'three';

/**
 * This module has writed by phatdev
 * Vietnamese: Tự custom three cho riêng mình :DD. Rảnh quá nên không có gì làm ngồi viết chơi chơi  hy vọng ổn.
 * TODO:
 * - Chắc là cái structure :DDD
 * - Mấy cái như shader, box các kiểu thêm vào trong này cho nó tiện chắc thế sau import cái file này thôi chứ đỡ import thêm three.
 * - Còn gì nữa thì sau tính tiếp nhưng mà cơ bản là như vậy đã.
 */
export class Engine {
  /**
   * new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
   * In three.js website. You can check out it below.
   */
  private POV = 10;
  private ASPECT = window.innerWidth/window.innerHeight;
  private NEAR = 0.1;
  private FAR = 1000;

  /**
   * This code snippet is sampled from the three.js documentation page you can check it out right here.
   * https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
   */
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(
    this.POV, 
    this.ASPECT, 
    this.NEAR, 
    this.FAR
  );
  private renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    precision: "highp",
    powerPreference: "high-performance"
  });

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
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 5;
    this.base = new Base(obj, x,  y, this.renderer, this.scene, this.camera);
  }

  /**
   * Clone Mesh from THREE
   * @param geometry 
   * @param material 
   * @returns 
   */
  public static createMesh(
    geometry?: any, 
    material?: any
  ): THREE.Mesh<any, any, THREE.Object3DEventMap> {
    return new THREE.Mesh(geometry, material)
  }

  /**
   * Clone DirectionalLight from THREE
   * @param color 
   * @param intensity 
   * @returns 
   */
  public static createDirectionalLight(
    color?: THREE.ColorRepresentation | undefined, 
    intensity?: number | undefined
  ): THREE.DirectionalLight {
    return new THREE.DirectionalLight(color, intensity);
  }

  /**
   * Clone PlaneGeometry from THREE
   * @param width 
   * @param height 
   * @param widthSegments 
   * @param heightSegments 
   * @returns 
   */
  public static createPlaneGeometry(
    width?: number | undefined, 
    height?: number | undefined, 
    widthSegments?: number | undefined, 
    heightSegments?: number | undefined
  ): THREE.PlaneGeometry {
    return new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
  }

  /**
   * Vietnamese:
   * Ờm phần này tách biệt ra chứ bên kia là constructor rồi để đây cho nó đẹp mắt.
   * Mà cấn cấn cái comment ghê.
   * @param vertexShader 
   * @param fragmentShader 
   * @returns 
   */
  public static createShader(
    vertexShader: string, 
    fragmentShader: string
  ): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({ 
      extensions: {
        derivatives: true
      },
      side: THREE.DoubleSide,
      wireframe: true,
      uniforms: {
        time: {
          value: 0.0,
        },
        resolution: {
          value: new THREE.Vector4()
        },
      },
    
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });
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
   *  Create base of Engine
   * @param obj 
   * @param x 
   * @param y 
   * @param renderer 
   */
  constructor(
    obj: HTMLElement, 
     x: number, 
     y: number,
     renderer:  THREE.WebGLRenderer,
     scene: THREE.Scene,
     camera: THREE.PerspectiveCamera
  ) {
    const dom = renderer.domElement;
    dom.style.position = "absolute";
    dom.style.zIndex = "0";
    dom.style.left = dom.style.top = this.valueResolve(0);

    Object.assign(this, {
      scene: scene,
      renderer: renderer,
      camera: camera
    });
    
    obj.appendChild(renderer.domElement);
  }

  public render(callback: () => void) {
    const renderLoop = () => {
        callback();
         
        Object.create(this)['renderer'].render(
          Object.create(this)['scene'], 
          Object.create(this)['camera']
        );
        requestAnimationFrame(renderLoop);
    };

    renderLoop();
  }
  /**
   * Vietnamese:
   * Cái này code cho vui thôi chứ chả có tác dụng gì đâu đừng để ý.
   * @param num 
   * @returns 
   */
  private valueResolve(num: number) {
    return `${num}`;
  }
}