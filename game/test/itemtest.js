/**
 * A world with a stickman player
 */

import { InfoBar } from "../columns/infobar.js";
import { Player } from "../entity/player/player.js";
import { WorldManager } from "../world/WorldManager.js";
import { Enermy } from "../entity/enermy/enermy.js"
import { Sword } from "../item/sword.js";

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
        this.load.spritesheet(
            'testman-animation',
            '/game/assets/animations/Testman.png',
            { frameWidth: 32, frameHeight: 50 }
        );

        Sword.load(this);
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
            frames: [{ key: 'stickman-animation', frame: 12 }],
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
            hp: {
                now: 20,
                total: 20
            },
            mp: {
                now: 18,
                total: 20
            },
            states: ["player"],
            speed: 300
        }, this.worldManager);
        this.worldManager.addEntityCollide(this.player);
        /*const pxPerEm = parseFloat(getComputedStyle(document.body).fontSize);
        const height = pxPerEm * 2.5;
        this.infobar = this.add.dom(this.scale.width / 2, this.scale.height - height).createFromCache('info-bar');
        */
        this.infoBar = new InfoBar(this, this.player);

        this.enermy = new Enermy(this, 300, 200, "testman-animation", {
            name: "testman",
            type: "player",
            heart: 20,
            states: ["player"],
        }, this.worldManager);
        this.worldManager.addEntityCollide(this.enermy);
        this.enermy.addAI(this.worldManager);
        this.enermy.AI.setHateTarget(this.player);
        this.enermy.AI.startCharseTarget();

        this.player.infos.hold = new Sword(this, this.player);
    }

    update() {
        if (this.player.infos.hp.now > 0) {
            this.player.infos.hp.now--;
            console.log(this.player.infos.hp.now)
        }
    }
}

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: '100%',
    height: '98%',
    parent: 'phaser-box',
    physics: {
        default: 'arcade',
    },
    dom: {
        createContainer: true
    },
    scene: Game,
});