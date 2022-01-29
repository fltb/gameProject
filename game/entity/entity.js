import { Item } from "../item/item.js";

export class Entity extends Phaser.GameObjects.Sprite {

    /**
     * An entity is a Phaser sprite with some actions.
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
     */
    constructor(scene, x, y, texture, infos) {

        super(scene, x, y, texture);

        this.scene = scene;
        
        let defaultInfos = {
            name: "undefined entity",
            type: "entity",
            states: [],
            heart: 20,
            speed: 250
        }

        this.infos = Object.assign(defaultInfos, infos);

        scene.physics.add.existing = this;
    }
    /**
     * Will be called while update
     */
    update() {

    }

    use() {
        if (
            this.infos.hold &&
            this.infos.hold.use &&
            typeof this.infos.hold.use === "function"
        ) {
            this.infos.hold.use(this);
        }
    }

    /**
     * Damage to the entity
     * @param {Number} damage - Damage to this entity
     */
    hurt(damage) {
        this.infos.heart -= damage;
        if (this.infos.heart <= 0) {
            this.die();
        }
    }

    die() {
        super.destroy();
    }
    /**
     * Move this entity to a position.
     * You can move to two position in the same time.
     * @param {Boolean} leftRight - true left false right
     * @param {Boolean} upDown - true up false down
     */
    moveLeft() {
        this.body.setVelocityX(-this.infos.speed);
    }
    moveRight() {
        this.body.setVelocityX(this.infos.speed);
    }

    moveUp() {
        this.body.setVelocityY(-this.infos.speed);
    }

    moveDown() {
        this.body.setVelocityY(this.infos.speed);
    }
}