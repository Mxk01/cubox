import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

// Set up the scene
const scene = new THREE.Scene();

// Add a point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Load background texture
const loader = new THREE.TextureLoader();
loader.load('pikachu.jpg', function (texture) {
    scene.background = texture;
});

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;
camera.position.x = 2;

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load textures
const pokemonTexture = new THREE.TextureLoader().load('assets/images/pokemon.jpg');
const pokemonTexture2 = new THREE.TextureLoader().load('assets/images/pikachu.jpg');

// Create directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 0);
light.castShadow = true;
scene.add(light);

// Configure light shadows
light.shadow.mapSize.width = window.innerWidth;
light.shadow.mapSize.height = window.innerHeight;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

// Create and add spheres
const geometryS2 = new THREE.SphereGeometry(44, 22, 66, 2, 62, 72);
const materialS2 = new THREE.MeshBasicMaterial({ map: pokemonTexture2 });
const sphere2 = new THREE.Mesh(geometryS2, materialS2);
scene.add(sphere2);

const geometryS = new THREE.SphereGeometry(1, 52, 36);
const materialS = new THREE.MeshBasicMaterial({ map: pokemonTexture });
const sphere = new THREE.Mesh(geometryS, materialS);
scene.add(sphere);

// Create and add torus
const geometry = new THREE.TorusGeometry(8, 2, 22, 66);
const material = new THREE.MeshBasicMaterial({ color: '#faff', wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    torus.rotation.y += 0.02;
    sphere.rotation.x += 0.1;
    torus.rotation.x += 0.01;
    renderer.render(scene, camera);
};

// Start the animation loop
animate();
