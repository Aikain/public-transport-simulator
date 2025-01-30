import { PerspectiveCamera } from 'three';

class Camera {
    readonly camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    private static MIN_DISTANCE = 2;
    private static MAX_DISTANCE = 40;

    private static MIN_ELEVATION = 10;
    private static MAX_ELEVATION = 80; // 90 will cause some unexpected issues

    private mouseDown = false;
    private ctrlDown = false;
    private azimuth = 0; // deg
    private elevation = 45; // deg

    private lookX = 0;
    private lookY = 0;
    private lookZ = 0;

    private distance = 10;

    constructor() {
        this.update();

        window.addEventListener('mousedown', () => (this.mouseDown = true));
        window.addEventListener('mouseup', () => (this.mouseDown = false));

        window.addEventListener('keydown', (event) => (this.ctrlDown = event.ctrlKey));
        window.addEventListener('keyup', (event) => (this.ctrlDown = event.ctrlKey));

        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('wheel', this.onWheel);
    }

    private onMouseMove = (event: MouseEvent) => {
        if (!this.mouseDown) return;

        if (this.ctrlDown) {
            this.azimuth -= event.movementX * 0.5;
            this.elevation = this.between(
                Camera.MIN_ELEVATION,
                Camera.MAX_ELEVATION,
                this.elevation + event.movementY * 0.5,
            );
        } else {
            this.lookX -=
                event.movementX * 0.02 * Math.cos((this.azimuth / 180) * Math.PI) -
                event.movementY * 0.02 * Math.sin(-(this.azimuth / 180) * Math.PI);

            this.lookZ +=
                event.movementX * 0.02 * Math.sin((this.azimuth / 180) * Math.PI) -
                event.movementY * 0.02 * Math.cos(-(this.azimuth / 180) * Math.PI);
        }

        this.update();
    };

    private onWheel = (event: WheelEvent) => {
        this.distance = this.between(Camera.MIN_DISTANCE, Camera.MAX_DISTANCE, this.distance + event.deltaY * 0.01);
        this.update();
    };

    private update = () => {
        this.camera.position.x =
            this.lookX +
            this.distance * Math.cos((this.elevation / 180) * Math.PI) * Math.sin((this.azimuth / 180) * Math.PI);
        this.camera.position.z =
            this.lookZ +
            this.distance * Math.cos((this.elevation / 180) * Math.PI) * Math.cos((this.azimuth / 180) * Math.PI);
        this.camera.position.y = this.lookY + this.distance * Math.sin((this.elevation / 180) * Math.PI);

        this.camera.lookAt(this.lookX, this.lookY, this.lookZ);
        this.camera.updateMatrix();
    };

    private between = (a: number, b: number, n: number) => Math.max(a, Math.min(b, n));
}

export default Camera;
