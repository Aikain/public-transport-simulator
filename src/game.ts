import { Clock, Scene } from 'three';
import World from './world.ts';

class Game {
    private SPEED = 10 * 1000; // 1000 is "real" speed

    private clock;
    private world;

    private startTime = new Date('2000-01-01 00:00:00').getTime();
    private clockDiv = document.getElementById('clock')!;

    constructor(scene: Scene) {
        this.world = new World(scene);
        this.clock = new Clock();
    }

    update() {
        this.world.update(this.clock.getDelta() * this.SPEED);
        this.clockDiv.innerText = new Date(this.startTime + this.clock.getElapsedTime() * this.SPEED).toLocaleString(
            undefined,
            {
                weekday: 'short',
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            },
        );
    }
}

export default Game;
