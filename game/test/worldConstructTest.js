import { WorldManager } from "../world/WorldManager.js";

class Game extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload() {
        this.load.tilemapTiledJSON("tilemap", "/game/assets/tiles/tilemap/untitled.json");
        this.load.image("dungeon", "/game/assets/tiles/tileset/dungeon.png");
    }

    create() {
        this.worldManager = new WorldManager(this, "tilemap", "dungeon", 32, 32);
        /*const map = this.make.tilemap({ key: "tilemap", tileWidth: 32, tileHeight: 32 });
        this.tileset = map.addTilesetImage("dungeon");
        
        this.backgroundLayer = map.createLayer("background", this.tileset);
        this.physicsLayer = map.createLayer("physics", this.tileset);
        this.effectLayer = map.createLayer("effect", this.tileset);
        */
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
            gravity: { y: 200 }
        }},
    scene: Game,
});