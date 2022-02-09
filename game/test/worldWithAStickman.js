/**
 * A world with a stickman player
 */

import Player from "../entity/player.js";
import { WorldManager } from "../world/WorldManager.js";

class Game extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload() {
        this.load.tilemapTiledJSON("tilemap", "/game/assets/tiles/tilemap/untitled.json");
        this.load.image("dungeon", "/game/assets/tiles/tileset/dungeon.png");

        this.load.spritesheet(
            'stickman-animation',
            '/game/assets/animations/stickman/stickman.png',
            { frameWidth: 32, frameHeight: 50 }
        );
    }

    create() {

        this.worldManager = new WorldManager(this, "tilemap", "dungeon", 32, 32);

        this.anims.create({
            key: 'stickman-left',
            frames: this.anims.generateFrameNumbers('stickman-animation', { start: 0, end: 11 }),
            frameRate: 30,
            repeat: -1
        });
        
        this.anims.create({
            key: 'stickman-stand',
            frames: [ { key: 'stickman-animation', frame: 12 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'stickman-right',
            frames: this.anims.generateFrameNumbers('stickman-animation', { start: 13, end: 24 }),
            frameRate: 30,
            repeat: -1
        });

        this.player = new Player(this, 200, 200, "stickman-animation", {
            name: "stickman",
            type: "player",
            heart: 20,
            states: ["player"],
            speed: 300
        }, this.worldManager);
        this.worldManager.addEntityCollide(this.player)
    }

    update() {

    }
}

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            
        }
    },
    scene: Game,
});