import Experience from "./Experience";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
  constructor() {
    this.experience = new Experience();

    this.debug = this.experience.debug;

    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;
    this.size = this.experience.size;
    this.fov = {
      x: this.size.width > 678 ? 75 : 75,
    };

    this.setInstance();
    this.setControls();

    if (this.debug.active) {
      // this.debugActive();
    }
  }

  setInstance() {
    this.instanceGroup = new THREE.Group();
    this.scene.add(this.instanceGroup);
    this.instance = new THREE.PerspectiveCamera(
      this.fov.x,
      this.size.width / this.size.height,
      0.01,
      100
    );
    this.instanceGroup.add(this.instance);

    this.instance.position.set(0, 0, 10);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    //? controls limitations

    this.controls.minDistance = 4;
    this.controls.maxDistance = 12.5;

    this.controls.minPolarAngle = -Math.PI / 0.1; // radians
    this.controls.maxPolarAngle = Math.PI / 1.8; // radians

    // this.controls.minAzimuthAngle = -0.1;
    // this.controls.maxAzimuthAngle = Math.PI * 0.55;

    //? set control target -- what to orbit around
    // this.controls.target.set(-0.893815, 1.26713, -1.19338);
  }

  resize() {
    this.instance.aspect = this.size.width / this.size.height;
    this.instance.updateProjectionMatrix();
  }
  debugActive() {
    this.cameraDebug = this.debug.gui.addFolder("camera");

    this.cameraDebug
      .add(this.instance.position, "x")
      .min(-50)
      .max(50)
      .step(0.001)
      .name("cameraX");
    this.cameraDebug
      .add(this.instance.position, "y")
      .min(-50)
      .max(50)
      .step(0.001)
      .name("cameraY");
    this.cameraDebug
      .add(this.instance.position, "z")
      .min(-50)
      .max(50)
      .step(0.001)
      .name("cameraZ");
    this.cameraDebug
      .add(this.fov, "x")
      .min(0)
      .max(100)
      .step(0.001)
      .name("cameraFOV")
      .onFinishChange(() => {
        this.instance.fov = this.fov.x;
        this.instance.aspect = this.size.width / this.size.height;
        this.instance.updateProjectionMatrix();
      });
  }

  update() {}
}