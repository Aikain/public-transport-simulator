import { Color, DirectionalLight, HemisphereLight, Mesh, MeshLambertMaterial, PlaneGeometry, Scene } from 'three';

class World {
    constructor(scene: Scene) {
        scene.background = new Color().setHex(0x87ceeb);

        scene.add(...this.setupLights());
        scene.add(this.setupGround());
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
}

export default World;
