import './style.css';
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene, WebGLRenderer } from 'three';
import Camera from './camera.ts';

const scene = new Scene();
const camera = new Camera();

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0x00ff00 });

for (let i = -10; i < 10; i++) {
    for (let j = -10; j < 10; j++) {
        const cube = new Mesh(geometry, material);
        cube.position.set(i * 2, 0, j * 2);
        scene.add(cube);
    }
}

const animate = () => {
    renderer.render(scene, camera.camera);
};

renderer.setAnimationLoop(animate);

document.querySelector<HTMLDivElement>('#app')!.appendChild(renderer.domElement);
