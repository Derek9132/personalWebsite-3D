import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import './style.css';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { element } from 'three/tsl';


const modelURL = new URL('resources/models/rocket.glb', import.meta.url);


// where all objects will go
const scene = new THREE.Scene();

// perspective camera mimics what human eye can see
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera.position.set(0, 0, 0);

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

const sunTexture = new THREE.TextureLoader().load('/sunTexture.jpg');
sunTexture.colorSpace = THREE.SRGBColorSpace;

const lightTexture = new THREE.TextureLoader().load('/lightSprite.png');
lightTexture.colorSpace = THREE.SRGBColorSpace;

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
const point3 = new THREE.PointLight(0xffffff, 130, 0, 2);
point3.position.set(0,0,55);

// for ring 4
const point4 = new THREE.PointLight(0xffffff, 130, 0, 2);
point4.position.set(-60,0,40);

// for ring 5
const point5 = new THREE.PointLight(0xffffff, 130, 0, 2);
point5.position.set(-60,0,-40);

// for ring 6
const point6 = new THREE.PointLight(0xffffff, 130, 0, 2);
point6.position.set(0,0,-55);

const sunPoint = new THREE.PointLight(0xffffff, 200, 0, 2);
sunPoint.position.set(0,0,0);




const ambient = new THREE.AmbientLight(0xffffff, 3);
const pointHelper = new THREE.PointLightHelper(point4)
const grid = new THREE.GridHelper(200, 50);
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(point1, point2, point3, point4, point5, point6, ambient, sunPoint);

// Add geometries: rocket, 1st ring (about), 2nd ring (work experience), 3rd ring (projects), 4th ring (skills), 5th ring (photos), 6th ring (contact)
const loader = new GLTFLoader();

let rocket;
loader.load(modelURL.href, function(gltf) {
  rocket = gltf.scene;
  rocket.rotateX(1.5708);
  rocket.position.set(85,2,0);
  //rocket.add(camera);
  scene.add(rocket);
  //camera.position.set(0, 0, -100);
})

// materials
const glacialMaterial = new THREE.MeshPhongMaterial({color: 0xa0f6fa});
const asteroidMaterial = new THREE.MeshBasicMaterial({map: asteroids});
const blueMaterial = new THREE.MeshPhongMaterial({color: 0x57aafc});
const purpleMaterial = new THREE.MeshPhongMaterial({color: 0xb357fc});
const darkpMaterial = new THREE.MeshPhongMaterial({color: 0x540394});
const redMaterial = new THREE.MeshPhongMaterial({color: 0xff8282});
const yellowMaterial = new THREE.MeshStandardMaterial({color: 0xfaeea0});
const blackMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
const whiteMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
const cyanMaterial = new THREE.MeshStandardMaterial({color: 0x2df5ff, roughness: 0});
const silverMaterial = new THREE.MeshPhongMaterial({color: 0xdee7e7});
const darkbMaterial = new THREE.MeshPhongMaterial({color: 0x093d8d});
const sunMaterial = new THREE.MeshStandardMaterial({map: sunTexture});
const lightMaterial = new THREE.MeshStandardMaterial({map: lightTexture});

// spheres
const sphereGeom = new THREE.SphereGeometry(1);

const sphere0 = new THREE.Mesh(sphereGeom, lightMaterial);
const spot0 = new THREE.SpotLight(0xffffff, 150, 0, Math.PI/3)
spot0.position.set(85, -3, 0);
spot0.target.position.set(85, 0, 0);
spot0.target.updateMatrixWorld();
sphere0.position.set(85, 0, 0);

const sphere1 = new THREE.Mesh(sphereGeom, cyanMaterial);
sphere1.position.set(35, 0, 50);

const sphere2 = new THREE.Mesh(sphereGeom, cyanMaterial);
sphere2.position.set(-35, 0, 50);

const sphere3 = new THREE.Mesh(sphereGeom, cyanMaterial);
sphere3.position.set(-85, 0, 0);

const sphere4 = new THREE.Mesh(sphereGeom, cyanMaterial);
sphere4.position.set(-35, 0, -50);

const sphere5 = new THREE.Mesh(sphereGeom, cyanMaterial);
sphere5.position.set(35, 0, -50);

const spheres = [sphere0, sphere1, sphere2, sphere3, sphere4, sphere5] // holds positions rocket can be in

const sunGeom = new THREE.SphereGeometry(10);
const sun = new THREE.Mesh(sunGeom, sunMaterial);
scene.add(sun);

const spotLightHelper = new THREE.SpotLightHelper(spot0);

scene.add(sphere0, sphere1, sphere2, sphere3, sphere4, sphere5);
scene.add(spot0, spotLightHelper);

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
ring31.position.set(0,0,55);
ring32.position.set(0,0,55);
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
ring61.position.set(0,0,-55);
ring62.position.set(0,0,-55);
scene.add(ring61, ring62);

//const ring6Geom
//


//scene.add(sphere);

// add stars
function addStar() {
  const starGeom = new THREE.IcosahedronGeometry(0.5);
  const starMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(starGeom, starMaterial);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x,y,z);

  scene.add(star);
}

Array(250).fill().forEach(addStar);

//const controls = new OrbitControls(camera, renderer.domElement);



// HTML elements
const panels = document.querySelectorAll(".panel");


// add buttons
const semiMajor = 150;
const semiMinor = 150;
const buttonCenterX = 0;
const buttonCenterY = 0;

let angleSum = Math.PI;

let buttonPanel = document.getElementById("buttonPanel");

let rocketButtonsList = [];

for (let i = 0; i < 6; i++) {
  const rocketButton = document.createElement("button");
  if (i == 0) {
    // set active class
    rocketButton.classList.add("fa-solid","fa-rocket");
  }

  rocketButton.classList.add("rocket-button");

  const rocketleft = buttonCenterX + semiMajor * Math.cos(angleSum);
  const rockettop = buttonCenterY + semiMinor * Math.sin(angleSum);

  rocketButton.style.left = `${rocketleft}px`;
  rocketButton.style.top = `${rockettop}px`;

  rocketButton.addEventListener("click", () => {
    // get sphere at index
    xTarget = spheres[i].position.x;
    zTarget = spheres[i].position.z;
    targetAngle = calculateTargetAngle(xTarget, zTarget);
    isMoving = true; // Enable movement
  });

  rocketButtonsList.push(rocketButton);

  buttonPanel.appendChild(rocketButton);

  angleSum += (Math.PI * 2) / 6;
}





// elliptical flight 
const radiusX = 85;
const radiusZ = 55;
const centerX = 0; 
const centerZ = 0; 
let angle = 0; 
let cameraAngle = 0;
const cameraOffset = 20;
let spinAngle = 0;

const speed = 0.02; 

let xTarget = 0;
let zTarget = 0;

/*spheres.forEach((element, index) => {
  const vector = element.position.clone(); // clone position of mesh
  vector.project(camera); // project / turn into normalized device coords (NDC)

  // Convert NDC to screen coordinates
  const x = (vector.x) * window.innerWidth;
  const y = (1 - (vector.y)) * window.innerHeight;

  panels[index].style.left = `${x}px`;
  panels[index].style.top = `${y}px`;

});*/

const spotlights = [spot0] // holds spotlights corresponding to positions

// group approach: group spheres and spotlights into one, store in singular array

window.addEventListener("wheel", (event) => {
  if (event.deltaY < 0) // scroll up, move forward 
  {
    angle += speed;
    angle %= 2 * Math.PI;
  }
  else if (event.deltaY > 0) // scroll down, move backwards
  {
    angle -= speed;
    angle %= 2 * Math.PI;
  }

})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight);
})


let isMoving = false;
let targetAngle = null;

function floatInRange(value, min, max) {
  console.log(value);
  if (value >= min && value <= max) {
    console.log('true');
    return true;
  }
  console.log('false');
  return false
}

function illuminateAndDisplay() {
  // check rocket position

}

function calculateTargetAngle(targetX, targetZ) {
  return Math.atan2(targetZ - centerZ, targetX - centerX);
}

/**document.getElementById("move").addEventListener("click", () => {
  // Calculate the target angle for the desired location
  targetAngle = calculateTargetAngle(-35, -50);
  isMoving = true; // Enable movement
});**/

function animate() {
  requestAnimationFrame(animate);

  //angle += speed;

  //angle %= 2 * Math.PI;

  if (isMoving) {
    // Increment the angle to move the rocket
    angle += 0.02; // Adjust speed
    angle %= 2 * Math.PI;

    // Update rocket position along the ellipse
    rocket.position.x = centerX + radiusX * Math.cos(angle);
    rocket.position.z = centerZ + radiusZ * Math.sin(angle);

    // Check if rocket is close to the target position
    if (
      floatInRange(rocket.position.x, xTarget - 2, xTarget + 2) &&
      floatInRange(rocket.position.z, zTarget - 2, zTarget + 2)
    ) {
      isMoving = false; // Stop movement
      console.log("Destination reached!");
    }
  }

  rocket.position.x = centerX + radiusX * Math.cos(angle); // X-coordinate
  rocket.position.z = centerZ + radiusZ * Math.sin(angle); // Y-coordinate

  const dx = -radiusX * Math.sin(angle); 
  const dz = radiusZ * Math.cos(angle);  
  const pathAngle = -Math.atan2(dx, dz); // Angle of the rocket along the path

  // rotate rocket along path
  rocket.rotation.z = -Math.atan2(dx, dz); 

  const pathQuaternion = new THREE.Quaternion();
  pathQuaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), pathAngle);

  // Create a quaternion for the rocket's initial X-axis rotation (90 degrees)
  const initialQuaternion = new THREE.Quaternion();
  initialQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2); // 90 degrees

  // Create a quaternion for the spin around the rocket's local Y-axis
  const spinQuaternion = new THREE.Quaternion();
  spinQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), spinAngle); // Incremental spin

  spinAngle += 0.02;

  // Combine the quaternions: initial rotation → path alignment → spin
  rocket.quaternion.copy(initialQuaternion);
  rocket.quaternion.multiply(pathQuaternion);
  rocket.quaternion.multiply(spinQuaternion);

  const forwardVector = new THREE.Vector3(0, 1, 0).applyQuaternion(rocket.quaternion);

  camera.position.x = rocket.position.x - forwardVector.x * cameraOffset;
  camera.position.y = rocket.position.y + 5; // Slightly above the rocket
  camera.position.z = rocket.position.z - forwardVector.z * cameraOffset;

  camera.lookAt(rocket.position);

  sun.rotation.y += 0.01;

  ring2.rotation.y = angle * 2.2;
  ring2.rotation.x = angle * 1;
  ring2.rotation.z = angle * 2;

  ring31.rotation.y = angle * 3;
  ring32.rotation.y = -angle * 3;

  ring4.rotation.x = angle;
  ring4.rotation.z = angle;
  ring4.rotation.y = angle;

  ring51.rotation.z = angle * 2;
  ring52.rotation.z = angle * 2 + 3.15;

  ring61.rotation.y = angle * 2;
  ring62.rotation.x = angle * 2;

  ring11.rotation.z = angle * 2;
  ring12.rotation.z = -angle * 2;
  ring13.rotation.z = -angle * 2;

  // check if rocket is near a sphere
  spheres.forEach((element, index) => {
    if (rocket.position.distanceTo(element.position) <= 4) {
      // turn on light at sphere

      // display div
      panels[index].classList.add("active");
      rocketButtonsList[index].classList.add("fa-solid","fa-rocket");
    }
    else {
      panels[index].classList.remove("active");
      rocketButtonsList[index].classList.remove("fa-solid","fa-rocket");
    }
  });

  renderer.render(scene, camera);
}


animate();


