import { Item } from "../item/item.js";

export class Entity extends Phaser.Physics.Arcade.Sprite {

    /**
     * @typedef Locks
     * @type {Object}
     * @property {Boolean} move - move's lock
     */

    /**
     * 
     * @typedef Infos
     * @type {Object}
     * @property {Boolean} move - move's lock     
     * @property {String} name - name of Entity
     * @property {String} type - type of entity
     * @property {Array} states - for collider check with block
     * @property {Number} hp.now - health for entity
     * @property {Number} hp.total - total health for entity
     * @property {Number} speed - pixels per second
     * @property {Item} [hold.leftHand] - Which item they held on left hand
     * @property {Item} [hold.rightHand] - Which item they held on left hand
     * @property {Boolean} [towards] - true left false right
     */

    /**
     * An entity is a Phaser sprite with some actions.
     * 
     * @param {Phaser.Scene} scene - Scene
     * @param {Number} x - x position
     * @param {Number} y - y position
     * @param {String} texture - texture
     * @param {Infos} infos - infomations of this entity
     */
    constructor(scene, x, y, texture, infos) {

        super(scene, x, y, texture);

        this.scene = scene;
        
        /**@type {Infos} */
        this.infos = {
            name: "undefined entity",
            type: "entity",
            states: [],
            hp: {
                now: 20,
                total: 20
            },
            speed: 150,
            hold: {
                rightHand: undefined,
                leftHand: undefined,
            },
            towards: false 
        }

        
        /**
         * @type {Locks}
         */
        this.locks = {
            move: false
        };

        Object.assign(this.infos, infos);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    useLeft() {
        if (this.hold.leftHand) {
           this.hold.leftHand.use(this);
        }
    }

    useRight() {
        if (this.hold.rightHand) {
            this.hold.rightHand.use(this);
        }
    }
    /**
     * Damage to the entity
     * @param {Number} damage - Damage to this entity
     */
    hurt(damage) {
        this.infos.hp.now -= damage;
        if (this.infos.hp.now <= 0) {
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