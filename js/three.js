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
  const motion = document.querySelector('.motion');

  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x979cea);

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, motion.clientWidth / motion.clientHeight, 0.1, 1000);

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 1, 9);
  scene.add(pointLight);

  // 랜더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  // 랜더러 사이즈 조절
  renderer.setSize(motion.clientWidth, motion.clientHeight);
  // 어떤 태그에 노출시킬것인지
  motion.appendChild(renderer.domElement);

  // 도형을 만드는 코드
  // geometry : 선을 그리는것
  const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 100);
  // material : 면을 만들어줌
  const material = new THREE.MeshPhongMaterial({
    color: 0x7421ab,
    emissive: 0x4797ff,
    depthWrite: true,
    shininess: 77,
  });
  // 모형을 만들어줌
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.minDistance = 1;
  // controls.maxDistance = 50;

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // controls.update();
    // 랜더 해주는 문법
    renderer.render(scene, camera);
  }
  animate();

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = motion.clientWidth / motion.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(motion.clientWidth, motion.clientHeight);
  }

  window.addEventListener('resize', onWindowResize);

} else {

  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);

}
