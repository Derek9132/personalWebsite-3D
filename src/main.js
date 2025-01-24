import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import './style.css';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons.js';


const modelURL = new URL('resources/models/rocket.glb', import.meta.url);

// where all objects will go
const scene = new THREE.Scene();

// perspective camera mimics what human eye can see
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// uses camera to render the scene
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true,
  preserveDrawingBuffer: true

});

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.5;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // make full screen renderer
camera.position.setZ(30); // move camera back, similar to person taking a step back

// load textures 
//const manager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader().load('/space.jpg');

const asteroids = new THREE.TextureLoader().load('/asteroidBelt.png');
asteroids.colorSpace = THREE.SRGBColorSpace;

const saturn = new THREE.TextureLoader().load('/saturnRing.png');
saturn.colorSpace = THREE.SRGBColorSpace;
//textureLoader.minFilter = THREE.LinearFilter;
scene.background = textureLoader;


//scene.background = new THREE.Color("red");

//renderer.render(scene, camera);
//renderer.render(scene, camera);


// Add light

// for ring 1
const point1 = new THREE.PointLight(0xffffff, 130, 0, 2);
point1.position.set(60,0,-40);

// for ring 2
const point2 = new THREE.PointLight(0xffffff, 130, 0, 2);
point2.position.set(60,0,40);

// for ring 3
const point3 = new THREE.PointLight(0xffffff, 130, 0, 2)
point3.position.set(0,0,60);

// for ring 4
const point4 = new THREE.PointLight(0xffffff, 130, 0, 2)
point4.position.set(-60,0,40);

// for ring 5
const point5 = new THREE.PointLight(0xffffff, 130, 0, 2)
point5.position.set(-60,0,-40);

// for ring 6
const point6 = new THREE.PointLight(0xffffff, 130, 0, 2)
point5.position.set(0,0,-50);



const ambient = new THREE.AmbientLight(0xffffff, 3);
const pointHelper = new THREE.PointLightHelper(point4)
const grid = new THREE.GridHelper(200, 50);
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(point1, point2, point3, point4, point5, point6, pointHelper, ambient, cameraHelper);

// Add geometries: rocket, 1st ring (about), 2nd ring (work experience), 3rd ring (projects), 4th ring (skills), 5th ring (photos), 6th ring (contact)
const loader = new GLTFLoader();

let rocket;
loader.load(modelURL.href, function(gltf) {
  rocket = gltf.scene;
  rocket.rotateX(190);
  rocket.position.set(0,0,0);
  scene.add(rocket);
})

// materials
const glacialMaterial = new THREE.MeshPhongMaterial({color: 0xa0f6fa, roughness: 0});
const asteroidMaterial = new THREE.MeshBasicMaterial({map: asteroids});
const saturnMaterial = new THREE.MeshBasicMaterial({map: saturn});
const blueMaterial = new THREE.MeshPhongMaterial({color: 0x57aafc});
const purpleMaterial = new THREE.MeshPhongMaterial({color: 0xb357fc, roughness: 0});
const darkpMaterial = new THREE.MeshPhongMaterial({color: 0x540394, roughness: 0});
const redMaterial = new THREE.MeshPhongMaterial({color: 0xff8282, roughness: 0});
const yellowMaterial = new THREE.MeshStandardMaterial({color: 0xfaeea0});
const blackMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
const whiteMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
const cyanMaterial = new THREE.MeshPhongMaterial({color: 0x2df5ff});
const silverMaterial = new THREE.MeshPhongMaterial({color: 0xdee7e7});
const darkbMaterial = new THREE.MeshPhongMaterial({color: 0x093d8d});

const ring1Geom = new THREE.TorusGeometry(10,1.5, 18, 5);
const ring11 = new THREE.Mesh(ring1Geom, silverMaterial);
const ring12 = new THREE.Mesh(ring1Geom, silverMaterial);
const ring13 = new THREE.Mesh(ring1Geom, silverMaterial);
ring11.rotateY(0.785398);
ring11.position.set(60, 0, -40);
ring12.rotateY(0.785398);
ring12.position.set(64, 0, -36);
ring13.rotateY(0.785398);
ring13.position.set(56, 0, -44)
scene.add(ring11, ring12, ring13);

//scene.add(ring1);

const ring2Geom = new THREE.TorusGeometry(10, 2, 12, 30);
const ring2 = new THREE.Mesh(ring2Geom, glacialMaterial);
ring2.rotateY(-0.785398);
ring2.position.set(60, 0, 40);
scene.add(ring2)

const ring3Geom1 = new THREE.TorusGeometry(16,1, 12, 10);
const ring3Geom2 = new THREE.TorusGeometry(12,1, 12, 10);
const ring31 = new THREE.Mesh(ring3Geom1, darkpMaterial);
const ring32 = new THREE.Mesh(ring3Geom2, purpleMaterial);
ring31.rotateY(Math.PI / 2);
ring32.rotateY(Math.PI / 2);
ring31.position.set(0,0,60);
ring32.position.set(0,0,60);
scene.add(ring31, ring32);

const ring4Geom = new THREE.TorusGeometry(14, 2.5, 12, 3);
const ring4 = new THREE.Mesh(ring4Geom, redMaterial);
ring4.rotateY(0.785398);
ring4.position.set(-60, 0, 40);
scene.add(ring4)

const ring5Geom1 = new THREE.TorusGeometry(12, 1.5, 12, 26, 2.7);
const ring5Geom2 = new THREE.TorusGeometry(12, 1.5, 12, 26, 2.7);
const ring51 = new THREE.Mesh(ring5Geom1, blackMaterial);
const ring52 = new THREE.Mesh(ring5Geom2, whiteMaterial);
ring52.rotateZ(3.14159);
ring52.rotateY(0.785398);
ring51.rotateY(-0.785398);
ring51.position.set(-60, 0,-40)
ring52.position.set(-60, 0,-40)
scene.add(ring51, ring52);

const ring6Geom1 = new THREE.TorusGeometry(20,1.5, 12, 4);
const ring6Geom2 = new THREE.TorusGeometry(10,1.5, 12, 26);
const ring61 = new THREE.Mesh(ring6Geom1, darkbMaterial);
const ring62 = new THREE.Mesh(ring6Geom2, blueMaterial);
ring61.rotateY(Math.PI / 2);
ring62.rotateY(Math.PI / 2);
ring61.position.set(0,0,-50);
ring62.position.set(0,0,-50);
scene.add(ring61, ring62);

//const ring6Geom
//

const sphereGeom = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0xb1e5fa});
const sphere = new THREE.Mesh(sphereGeom, sphereMaterial);
sphere.position.setX(0);
//scene.add(sphere);

// add stars
function addStar() {
  const starGeom = new THREE.IcosahedronGeometry(0.5);
  const starMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(starGeom, starMaterial);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));
  star.position.set(x,y,z);

  scene.add(star);
}

Array(200).fill().forEach(addStar);

// add orbit controls
//const controls = new OrbitControls(camera, renderer.domElement);

// Parameters for the circular path
const radiusX = 85; // Radius of the circular path
const radiusZ = 55;
const centerX = 0; // X center of the circle
const centerZ = 0; // Y center of the circle
let angle = 0; // Initial angle (in radians)

const speed = 0.01; // Adjust this value to control the speed of rotation

function moveOnScroll() {
  angle += speed;

  angle %= 2 * Math.PI;

  rocket.position.x = centerX + radiusX * Math.cos(angle); // X-coordinate
  rocket.position.z = centerZ + radiusZ * Math.sin(angle); // Y-coordinate

  const dx = -radiusX * Math.sin(angle); // Derivative of x
  const dz = radiusZ * Math.cos(angle);  // Derivative of z

  // Calculate the angle to rotate the rocket
  rocket.rotation.z = -Math.atan2(dx, dz); // Y-axis rotation to face direction of travel

  renderer.render(scene, camera);
}

//document.body.onscroll = moveOnScroll;

let scrollProgress = 0; // Value between 0 and 1 representing scroll progress
const maxScroll = document.documentElement.scrollHeight - window.innerHeight; // Maximum scroll value

window.addEventListener('scroll', () => {
  console.log('scrolling');
  const scrollY = window.scrollY; // Current scroll position
  scrollProgress = scrollY / maxScroll; // Normalize to a value between 0 and 1
  angle = scrollProgress * 2 * Math.PI; // Map scroll progress to the angle (0 to 2π)
});

function animate() {
  requestAnimationFrame(animate);

  rocket.position.x = centerX + radiusX * Math.cos(angle); // X-coordinate
  rocket.position.z = centerZ + radiusZ * Math.sin(angle); // Y-coordinate

  const dx = -radiusX * Math.sin(angle); // Derivative of x
  const dz = radiusZ * Math.cos(angle);  // Derivative of z

  // Calculate the angle to rotate the rocket
  rocket.rotation.z = -Math.atan2(dx, dz); // Y-axis rotation to face direction of travel 

  // make camera follow rocket
  const cameraOffsetAngle = -Math.PI / 4;

  const cameraAngle = angle + cameraOffsetAngle; // Camera lags behind the rocket
  //camera.position.x = centerX + radiusX * Math.cos(cameraAngle); // X-coordinate
  //camera.position.z = centerZ + radiusZ * Math.sin(cameraAngle); // Z-coordinate
  //camera.position.y = 5; // Keep the camera slightly above the plane for a better view

  camera.lookAt(rocket.position); // Ensure the camera points at the rocket



  //camera.position.x = rocket.position.x + 2; // Offset for better view
  //camera.position.y = rocket.position.y + 2;
  //camera.lookAt(rocket.position); // Ensure the camera points at the rocket

  ring51.rotation.z += 0.02;
  ring52.rotation.z += 0.02;

  //controls.update();

  renderer.render(scene, camera);
}

animate();


