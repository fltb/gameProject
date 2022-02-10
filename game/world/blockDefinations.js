import { Entity } from "../entity/enermy/entity.js";


export const blockDefinations = {
    wall: {

    },
    limitwall: {
        /**
         * 
         * @param { Entity } sprite 
         * @param { Phaser.Tilemaps.Tile} tile 
         * @returns {Boolean} - true means not to collide while false has opposite meaning
         */
        collideCallback: function(sprite, tile) {
            
            /**
             * 
             * @param {Array} original 
             * @param {Array} checking 
             */
            function inArray(original, checking) {
                if (!(original && checking)) {
                    return false;
                }
                for (let i = 0; i < checking.length; i++) {
                    const find = checking[i];
                    for (let j = 0; j < original.length; j++) {
                        const item = original[j];
                        if (find === item) {
                            return true;
                        }
                    }
                }
                return false;
            }

            if (tile.properties.mode === "whitelist") {
                /** @type {Array} */
                const allows = tile.properties.allows.split(",");
                return inArray(allows, sprite.infos.states);
            } else if (tile.properties.mode === "blacklist") {
                /** @type {Array} */
                const blocks = tile.properties.blocks.split(",");
                return !inArray(blocks, sprite.infos.states);
            } else {
                throw new Error("At Tile ID: " + tile.index + ", A limitwall must have its mode." );
            }
        }
    }
};