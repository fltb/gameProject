import { Enermy } from "./enermy.js";

export class Testman extends Enermy {

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static loader(scene) {
        scene.load.spritesheet(
            'testman-animation',
            '/game/assets/animations/Testman.png',
            { frameWidth: 32, frameHeight: 50 }
        );
    }

    constructor(scene, x, y, worldManager) {
        super(scene, x, y, "testman-animation", {
            name: "testman",
            type: "enermy",
            heart: 20,
            states: ["player"],
        }, worldManager);
    }
}