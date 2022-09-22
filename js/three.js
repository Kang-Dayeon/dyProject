import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

class WebGL {

  static isWebGLAvailable() {

    try {

      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));

    } catch (e) {

      return false;

    }

  }

  static isWebGL2Available() {

    try {

      const canvas = document.createElement('canvas');
      return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));

    } catch (e) {

      return false;

    }

  }

  static getWebGLErrorMessage() {

    return this.getErrorMessage(1);

  }

  static getWebGL2ErrorMessage() {

    return this.getErrorMessage(2);

  }

  static getErrorMessage(version) {

    const names = {
      1: 'WebGL',
      2: 'WebGL 2'
    };

    const contexts = {
      1: window.WebGLRenderingContext,
      2: window.WebGL2RenderingContext
    };

    let message = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';

    const element = document.createElement('div');
    element.id = 'webglmessage';
    element.style.fontFamily = 'monospace';
    element.style.fontSize = '13px';
    element.style.fontWeight = 'normal';
    element.style.textAlign = 'center';
    element.style.background = '#fff';
    element.style.color = '#000';
    element.style.padding = '1.5em';
    element.style.width = '400px';
    element.style.margin = '5em auto 0';

    if (contexts[version]) {

      message = message.replace('$0', 'graphics card');

    } else {

      message = message.replace('$0', 'browser');

    }

    message = message.replace('$1', names[version]);

    element.innerHTML = message;

    return element;

  }

}

export default WebGL;
// webgl 호환성 검새
if (WebGL.isWebGLAvailable()) {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true //계단현상 없애기
  });
  renderer.setSize(innerWidth, innerHeight + 100);
  renderer.setPixelRatio(devicePixelRatio > 1 ? 2 : 1);

  // scene : 무대
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7862cf);

  // camera : 카메라
  const camera = new THREE.PerspectiveCamera(
    75, //시야각(field of view)
    innerWidth / innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // fal
  );

  camera.position.set(0, 0.5, 5);

  // scene(무대)에 카메라를 추가해준는것
  scene.add(camera);

  // light 조명 설정
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new THREE.SphereGeometry(2, 64, 64);
  const meterial = new THREE.MeshStandardMaterial({
    color: 0x8676e3,
    side: THREE.DoubleSide,
    flatShading: true
  });

  const box1 = new THREE.Mesh(geometry, meterial);
  scene.add(box1);

  const positionArray = geometry.attributes.position.array;
  const randomArray = [];
  for (let i = 0; i < positionArray.length; i += 3) {
    positionArray[i] += (Math.random() - 0.5) * 0.2;
    positionArray[i + 1] += (Math.random() - 0.5) * 0.2;
    positionArray[i + 2] += (Math.random() - 0.5) * 0.2;

    randomArray[i] = (Math.random() - 0.5) * 0.2;;
    randomArray[i + 1] = (Math.random() - 0.5) * 0.2;;
    randomArray[i + 2] = (Math.random() - 0.5) * 0.2;;
  }

  renderer.render(scene, camera);

  const clock = new THREE.Clock();

  // 애니메이션
  const drew = () => {
    const time = clock.getElapsedTime() * 3;
    for (let i = 0; i < positionArray.length; i += 3) {
      positionArray[i] += Math.sin(time + randomArray[i] * 100) * 0.002;
      positionArray[i + 1] += Math.sin(time + randomArray[i] * 100) * 0.002;
      positionArray[i + 2] += Math.sin(time + randomArray[i] * 100) * 0.002;
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    renderer.setAnimationLoop(drew);
  }

  const setSize = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(innerWidth, innerHeight + 100);
    renderer.render(scene, camera);
  }
  // 이벤트
  window.addEventListener('resize', setSize);

  drew();

} else {

  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);

}
