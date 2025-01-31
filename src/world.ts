import {
    BoxGeometry,
    Color,
    DirectionalLight,
    HemisphereLight,
    Mesh,
    MeshLambertMaterial,
    PlaneGeometry,
    Scene,
} from 'three';

class World {
    private cube;

    constructor(scene: Scene) {
        scene.background = new Color().setHex(0x87ceeb);

        scene.add(...this.setupLights());
        scene.add(this.setupGround());

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshLambertMaterial({ color: 0xff0000 });

        const cube = new Mesh(geometry, material);
        cube.position.set(0, 0, 0);
        scene.add(cube);

        this.cube = new Mesh(geometry, material);
        this.cube.position.set(2, 0, 0);
        scene.add(this.cube);
    }

    private setupGround = () => {
        const groundGeo = new PlaneGeometry(10000, 10000);
        const groundMat = new MeshLambertMaterial({ color: 0x3f9b0b });
        const ground = new Mesh(groundGeo, groundMat);
        ground.position.y = -1;
        ground.rotation.x = -Math.PI / 2;

        return ground;
    };

    private setupLights = () => {
        const hemisphereLight = new HemisphereLight(0xffffff, 0xffffff, 2);
        hemisphereLight.color.setHSL(0.6, 1, 0.6);

        const directionalLight = new DirectionalLight(0xffffff, 3);
        directionalLight.position.set(-1, 1.75, 1);

        return [hemisphereLight, directionalLight];
    };

    update(delta: number) {
        if (this.cube.position.x >= 2) {
            if (this.cube.position.z >= 2) {
                this.cube.position.x -= delta / 1000;
            } else {
                this.cube.position.z += delta / 1000;
            }
        } else if (this.cube.position.x <= -2) {
            if (this.cube.position.z <= -2) {
                this.cube.position.x += delta / 1000;
            } else {
                this.cube.position.z -= delta / 1000;
            }
        } else if (this.cube.position.z >= 2) {
            if (this.cube.position.x <= -2) {
                this.cube.position.z -= delta / 1000;
            } else {
                this.cube.position.x -= delta / 1000;
            }
        } else {
            if (this.cube.position.x >= 2) {
                this.cube.position.z += delta / 1000;
            } else {
                this.cube.position.x += delta / 1000;
            }
        }
    }
}

export default World;
