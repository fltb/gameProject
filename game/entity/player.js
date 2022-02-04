import { Entity } from "./entity.js";
import { config } from "../config/config.js";

export class Player extends Entity {

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
        /**@type {Object} - dash's info */
        infos.dash = {
            distance: 100,
            cd: 500,
            time: 150,
        };
        super(scene, x, y, texture, infos);

        this.locks = {};

        // remember move is not always the "WASD" key on keyboard
        scene.input.mouse.disableContextMenu();
        this.W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.upKey]);
        this.S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.downKey]);
        this.A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.leftKey]);
        this.D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.rightKey]);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.moving();

        const pointer = this.scene.input.activePointer;
        if (pointer.rightButtonDown()) {
            this.skillDash(pointer);
        }
    }

    moving() {
        if (this.locks.move) {
            return;
        }

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

    /** */
    skillDash(pointer) {
        if (this.locks.dash) {
            return;
        }
        this.locks.dash = true;
        this.locks.move = true;
        let that = this;

        this.setVisible(false)

        const  diffX = pointer.x - this.x, diffY = pointer.y-this.y;
        const degree = Math.atan(diffY / diffX);
        let mvX = this.infos.dash.distance * Math.cos(degree);
        let mvY = this.infos.dash.distance * Math.sin(degree);
        if (diffX < 0) {
            mvX = -mvX;
            mvY = -mvY;
        }
        mvX *= 1000 / this.infos.dash.time;
        mvY *= 1000 / this.infos.dash.time;
        
        this.setVelocity(mvX, mvY);
        this.scene.time.delayedCall(this.infos.dash.time, function name() {
            that.clearMove();
            that.setVisible(true);
            that.locks.move = false;
        }, [], this.scene);
        this.scene.time.delayedCall(this.infos.dash.cd, function name() {
            that.locks.dash = false;
        }, [], this.scene);
    }
}