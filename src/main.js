import './style.css'
import * as THREE from 'three';

// where all objects will go
const scene = new THREE.Scene();

// perspective camera mimics what human eye can see
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 

// uses camera to render the scene
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // make full screen renderer
camera.position.setZ(30); // move camera back, similar to person taking a step back

renderer.render(scene, camera);


