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
        this.physicsLayer.setCollisionBetween(BLOCK_BEGIN, BLOCK_END);

        for (let i = BLOCK_BEGIN; i <= BLOCK_END; i++) {
            const properties = this.tileset.getTileProperties(i);
            if (properties) {
                const type = properties.type;
                if (type) {
                    if (typeof blockDefinations[type].collideCallback === "function") {
                        this.physicsLayer.setTileIndexCallback(i, blockDefinations[type].collideCallback, this.scene);
                    }
                }
            }
        }

        this.exportToArray();
    }

    /**
     * 
     * @param {Entity} entity 
     */
    addEntity(entity) {
        this.scene.physics.add.collider(entity, this.physicsLayer);
    }

    /**
     * 
     * @returns {Array<Array<Number>>} - grid[y][x];
     */
    exportToArray() {

        let exportArray;

        let collideIndexes = [];
        
        for (let i = 0; i < this.map.layers.length; i++) {
            const element = this.map.layers[i];
            if (element.name.indexOf("physics") === 0) {
                if (!exportArray) {
                    exportArray = []
                    for (let y = 0; y < element.height; y++) {
                        exportArray[y] = [];
                        for (let x = 0; x < element.width; x++) {
                            exportArray[y][x] = 0;
                        }
                    }
                }

                for (let i = 0; i < element.collideIndexes.length; i++) {
                    collideIndexes[element.collideIndexes[i]] = true;
                }

                for (let i = 0; i < element.height; i++) {
                    for (let j = 0; j < element.width; j++) {
                        const tile = element.data[i][j];
                        if (!exportArray[i][j] && collideIndexes[tile.index]) {
                            exportArray[i][j] = tile.index;
                        }
                    }
                }
            }
        }

        return exportArray;
    }
}