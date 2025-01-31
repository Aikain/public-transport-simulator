import './style.css';
import { Scene, WebGLRenderer } from 'three';
import Camera from './camera.ts';
import Game from './game.ts';

const scene = new Scene();
const camera = new Camera();
const game = new Game(scene);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const animate = () => {
    game.update();
    renderer.render(scene, camera.camera);
};

renderer.setAnimationLoop(animate);

document.querySelector<HTMLDivElement>('#app')!.appendChild(renderer.domElement);
