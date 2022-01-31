import { Item } from "../item/item.js";

export class Entity extends Phaser.Physics.Arcade.Sprite {

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
        
        this.infos = {
            name: "undefined entity",
            type: "entity",
            states: [],
            heart: 20,
            speed: 150,
            /**@type {Boolean} - true left false right */
            towards: false 
        }

        Object.assign(this.infos, infos);
        scene.add.existing(this);
        scene.physics.add.existing(this);
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
        this.infos.towards = true;
        this.playAnimationRun();
        this.setVelocityX(-this.infos.speed);
    }
    moveRight() {
        this.infos.towards = false;
        this.playAnimationRun();
        this.setVelocityX(this.infos.speed);
    }

    moveUp() {
        this.playAnimationRun();
        this.setVelocityY(-this.infos.speed);
    }

    moveDown() {
        this.playAnimationRun();
        this.setVelocityY(this.infos.speed);
    }

    clearMoveX() {
        this.setVelocityX(0);
    }

    clearMoveY() {
        this.setVelocityY(0);
    }

    clearMove() {
        this.playAnimationStand();
        this.setVelocity(0);
    }

    playAnimationStand() {
        this.anims.play(this.infos.name + '-stand');
    }

    playAnimationRun() {
        if (this.infos.towards) {
            // left
            this.anims.play(this.infos.name + '-left', true);
        } else {
            // right
            this.anims.play(this.infos.name + '-right', true);
        }
    }
}