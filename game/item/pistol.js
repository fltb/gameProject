import { Item } from "./item.js";
export class Pistol extends Item {

    static textureName = 'pistol'
    static texturePath = '/game/assets/textures/items/pistol'
    /**@param {Phaser.Scene} */
    static load(scene) {
        scene.load.image('/ga')
    }
    constructor() {

    }
}