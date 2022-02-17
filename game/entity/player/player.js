import { Entity } from "../entity.js";
import { config } from "../../config/config.js";
import { WorldManager } from "../../world/WorldManager.js";
import { Item } from "../../item/item.js";
import { Sword } from "../../item/sword.js";
import { PlayerManager } from "../../logic/playerManager.js";

export class Player extends Entity {

    /**
     * 
     * @typedef Infos
     * @type {{
     *      name: String,
     *       type: String,
     *       states: Array,
     *       hp: {
      *          now: Number,
      *          total: Number
      *      },
      *      speed: Number,
      *      hold: Item,
      *      skill: Skill,
      *      towards: Boolean 
      *  }}
     */


    /**
     * 
     * @param {Phaser.Scene} scene - Scene
     * @param {Number} x - x position
     * @param {Number} y - y position
     * @param {String} texture - texture
     * @param {Infos} infos
     * @param {String} animation - Animation's name
     * @param {WorldManager} worldManager
     */
    constructor(scene, x, y, texture, infos, worldManager) {
        infos.type = "player";
        /**@type {Object} - dash's info */
        infos.dash = {
            distance: 100,
            cd: 500,
            time: 150,
        };
        infos.speed = 300
        super(scene, x, y, texture, infos, worldManager);

        /*
        // remember move is not always the "WASD" key on keyboard
        scene.input.mouse.disableContextMenu();
        this.W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.upKey]);
        this.S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.downKey]);
        this.A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.leftKey]);
        this.D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.rightKey]);
        */
        this.manager = new PlayerManager(scene, worldManager, this);
    }

    /*preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.moving();

        const pointer = this.scene.input.activePointer;
        if (pointer.rightButtonDown()) {
            // left hand is right click!!!
            this.useSkill(pointer);
        }

        if (pointer.leftButtonDown()) {
            this.useHand(pointer);
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
    }*/

    /** */
    useSkill(pointer) {
        super.useSkill(this.getTowordRadian(pointer));
        if (this.locks.dash) {
            return;
        }
        this.locks.dash = true;
        this.locks.move = true;
        let that = this;

        this.setVisible(false)

        const radian = this.getTowordRadian(pointer);
        let mvX = this.infos.dash.distance * Math.cos(radian);
        let mvY = this.infos.dash.distance * Math.sin(radian);

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

    /**
     * 
     * @param {*} pointer 
     */
    useHand(pointer) {
        super.useHand(this.getTowordRadian(pointer));
    }
}