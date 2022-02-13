import { Player } from "./player.js";

export class Stickman extends Player {

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static loader(scene) {
        scene.load.spritesheet(
            'stickman-animation',
            '/game/assets/animations/stickman/stickman.png',
            { frameWidth: 32, frameHeight: 50 }
        );
    }

    constructor(scene, x, y, worldManager) {

        scene.anims.create({
            key: 'stickman-left',
            frames: scene.anims.generateFrameNumbers('stickman-animation', { start: 0, end: 11 }),
            frameRate: 30,
            repeat: -1
        });
        
        scene.anims.create({
            key: 'stickman-stand',
            frames: [ { key: 'stickman-animation', frame: 12 } ],
            frameRate: 20
        });
        
        scene.anims.create({
            key: 'stickman-right',
            frames: scene.anims.generateFrameNumbers('stickman-animation', { start: 13, end: 24 }),
            frameRate: 30,
            repeat: -1
        });

        super(scene, x, y, "stickman-animation", {
            name: "stickman",
            type: "player",
            hp: {
                now: 20,
                total: 20
            },
            mp: {
                now: 18,
                total: 20
            },
            states: ["player"],
        }, worldManager);
    }
}