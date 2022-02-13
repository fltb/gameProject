/**
 * A stickman player and a testman
 */

import { InfoBar } from "../columns/infobar.js";
import { Testman } from "../entity/enermy/testman.js";
import { Stickman } from "../entity/player/stickman.js";
import { Sword } from "../item/sword.js";
import { WorldManager } from "../world/WorldManager.js";

class Game extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload() {
        this.load.tilemapTiledJSON("tilemap", "/game/assets/tiles/tilemap/untitled.json");
        this.load.image("dungeon", "/game/assets/tiles/tileset/dungeon.png");
        Stickman.loader(this);
        Testman.loader(this);

        Sword.loader(this);
    }

    create() {

        this.worldManager = new WorldManager(this, "tilemap", "dungeon", 32, 32);
        this.player = new Stickman(this, 200, 200, this.worldManager);
        this.worldManager.addEntityCollide(this.player);

        this.infoBar = new InfoBar(this, this.player);
        this.player.infos.hold = new Sword(this, this.player);

        this.enermy = new Testman(this, 300, 200, this.worldManager);
        this.worldManager.addEntityCollide(this.enermy);
        this.enermy.addAI(this.worldManager);
        this.enermy.AI.setHateTarget(this.player);
        this.enermy.AI.startCharseTarget();
    }

    update() {
        if (!this.CNT) {
            this.CNT = 0;
        } else {
            this.CNT++;
            if (this.CNT > 10000) {
                this.enermy.AI.stopCharseTarget();
            }
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