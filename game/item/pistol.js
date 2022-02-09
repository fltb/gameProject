import { Item } from "./item.js";
export class Pistol extends Item {

    static texturePath = '/game/assets/textures/items/pistol/'
    static iconName = ''
    /**@param {Phaser.Scene} */
    static load(scene) {
        scene.load.image()
    }
    constructor() {

    }
}