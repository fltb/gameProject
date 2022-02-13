import { Item } from "./item.js";

export class MeleeWeapon extends Item {
    /**
     * 
     * @param {Phaser.Scene} scene
     * @param {Entity} owner
     * @param {String} texture - image path
     * @param {Number} cd - cd of this item, -1 or 0 is no
     * @param {String} info - infos that displayed when pointer hover on image
     */
    constructor(scene, owner, texture, cd, info){
        super(scene, owner, texture, cd, info);
    }
}