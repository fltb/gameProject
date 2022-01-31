import { Entity } from "./entity.js";
import { config } from "../config/config.js";

export default class Player extends Entity {

    /**
     * 
     * @param {Phaser.Scene} scene - Scene
     * @param {Number} x - x position
     * @param {Number} y - y position
     * @param {String} texture - texture
     * @param {Object} infos - infomations of this entity
     * @param {String} infos.name - name of Entity
     * @param {String} infos.type - type of entity
     * @param {Array} infos.states - for collider check with block
     * @param {Number} infos.heart - health for entity
     * @param {Number} infos.speed - pixels per second
     * @param {Item} [infos.hold] - Which item they held
     * @param {String} animation - Animation's name
     */
    constructor(scene, x, y, texture, infos) {
        infos.type = "player";
        super(scene, x, y, texture, infos);

        // remember move is not always the "WASD" key on keyboard
        scene.input.mouse.disableContextMenu();
        this.W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.upKey]);
        this.S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.downKey]);
        this.A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.leftKey]);
        this.D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.rightKey]);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.W.isDown && !this.S.isDown) {
            this.moveUp();
        } else if (this.S.isDown && !this.W.isDown) {
            this.moveDown();
        } else if (!(this.S.isDown || this.W.isDown)) {
            this.clearMoveY();
        }
        if (this.A.isDown && !this.D.isDown) {
            this.moveLeft();
        } else if (this.D.isDown && !this.A.isDown) {
            this.moveRight();
        } else if (!this.A.isDown && !this.D.isDown) {
            this.clearMoveX();
        }

        if (!(this.W.isDown || this.S.isDown || this.A.isDown || this.D.isDown)) {
            this.clearMove();
        }
    }
}