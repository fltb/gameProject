import { Entity } from "../entity/entity.js";
import { blockDefinations } from "./blockDefinations.js";

export class WorldManager {

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {String} tilemap 
     * @param {String} tileset 
     * @param {Number} tileHeight
     * @param {Number} tileWidth
     */
    constructor(scene, tilemap, tileset, tileWidth, tileHeight) {
        this.scene = scene;
        const map = this.map = scene.make.tilemap({ key: tilemap, tileWidth: tileWidth, tileHeight: tileHeight });
        this.tileset = map.addTilesetImage(tileset);
        
        this.backgroundLayer = map.createLayer("background", this.tileset);
        this.physicsLayer = map.createLayer("physics", this.tileset);
        this.effectLayer = map.createLayer("effect", this.tileset);

        // add collision to blocks, ID!
        const BLOCK_BEGIN = 32;
        const BLOCK_END = 53;
        this.map.setCollisionBetween(BLOCK_BEGIN, BLOCK_END);

        for (let i = BLOCK_BEGIN; i <= BLOCK_END; i++) {
            const properties = this.tileset.getTileProperties(i);
            if (properties) {
                const type = properties.type;
                if (type) {
                    if (typeof blockDefinations[type].collideCallback === "function") {
                        this.map.setTileIndexCallback(i, blockDefinations[type].collideCallback, this.scene);
                    }
                }
            }
        }
    }

    /**
     * 
     * @param {Entity} entity 
     */
    addEntity(entity) {
        this.scene.add.collider(entity, this.physicsLayer);
    }
}