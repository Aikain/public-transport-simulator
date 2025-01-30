import './style.css';
import { BoxGeometry, Mesh, MeshLambertMaterial, Scene, WebGLRenderer } from 'three';
import Camera from './camera.ts';
import World from './world.ts';

const scene = new Scene();
new World(scene);

const camera = new Camera();

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshLambertMaterial({ color: 0xff0000 });

const cube = new Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

const animate = () => {
    renderer.render(scene, camera.camera);
};

renderer.setAnimationLoop(animate);

document.querySelector<HTMLDivElement>('#app')!.appendChild(renderer.domElement);
