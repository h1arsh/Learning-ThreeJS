import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import GUI from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// const helper1 = new THREE.DirectionalLightHelper(directionalLight, 2);
// scene.add(helper1);

// Add studio light
const studioLight = new THREE.PointLight(0xffffff, 1);
studioLight.position.set(5, 5, 5);
scene.add(studioLight);

// const helper2 = new THREE.PointLightHelper(studioLight, 2);
// scene.add(helper2);

// Point light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 2, 5);
scene.add(pointLight);

// const helper = new THREE.PointLightHelper(pointLight, 2);
// scene.add(helper);


// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();
const color = textureLoader.load('./1k/color1.jpg');

const roughness = textureLoader.load('./1k/roughness1.jpg');

const metal = textureLoader.load('./1k/metal.jpg');

const loader = new GLTFLoader();

loader.load( './Animated Robot.glb', function ( gltf ) {
    const model = gltf.scene;
    model.position.set(0, -2, 0);  // Place the model at the center of the scene
    scene.add(model);

    const gui = new GUI();

    const modelFolder = gui.addFolder('Model Position');
    modelFolder.add(model.position, 'x', -10, 10);
    modelFolder.add(model.position, 'y', -10, 10);
    modelFolder.add(model.position, 'z', -10, 10);
    modelFolder.open();

    const lightFolder = gui.addFolder('Light Intensity');
    lightFolder.add(studioLight, 'intensity', 0, 2);
    lightFolder.add(pointLight, 'intensity', 0, 2);
    lightFolder.open();

});

const geometry = new THREE.CylinderGeometry( 2, 2, 3, 30, 1, false);
const material = new THREE.MeshStandardMaterial({ map: roughness, roughnessMap: roughness, metalnessMap: metal});
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 9;
camera.position.y = 0;
camera.position.x = 0;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);


// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1; // Added damping factor

function animate() {
    window.requestAnimationFrame(animate);
    controls.update();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
