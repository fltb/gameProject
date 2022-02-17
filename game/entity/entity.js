import { Item } from "../item/item.js";
import { WorldManager } from "../world/WorldManager.js";

export class Entity extends Phaser.Physics.Arcade.Sprite {

    /**
     * @typedef Locks
     * @type {Object}
     * @property {Boolean} move - move's lock
     * @property {Boolean} hurt
     */

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
     * An entity is a Phaser sprite with some actions.
     * 
     * @param {Phaser.Scene} scene - Scene
     * @param {Number} x - x position
     * @param {Number} y - y position
     * @param {String} texture - texture
     * @param {Infos} infos - infomations of this entity
     * @param {WorldManager} worldManager
     */
    constructor(scene, x, y, texture, infos, worldManager) {

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
            hold: undefined,
            skill: undefined,
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

        this.worldManager = worldManager;
        /**@type {Number} - the id of this entity */
        this.id = this.worldManager.addEntity(this);

        /**@type {Array<Function>}  */
        this.preUpdateList = []
    }

    /**@param {Function} params */
    addToPreUpdate(params) {
        this.preUpdateList.push(params);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.preUpdateList.forEach(function(func) {
            func();
        })
    }
    /**
     * 
     * @param {Number} toword - radian
     */
    useSkill(toword) {
        if (this.infos.skill) {
           this.infos.skill.use(this, toword);
        }
    }

    /**
     * @param {Number} toword - radian
     */
    useHand(toword) {
        if (this.infos.hold) {
            this.infos.hold.use(this, toword);
        }
    }
    /**
     * Damage to the entity
     * @param {Number} damage - Damage to this entity
     */
    hurt(damage) {
        if (this.locks.hurt) {
            return;
        }
        this.infos.hp.now -= damage;
        if (this.infos.hp.now <= 0) {
            this.die();
        }
    }

    die() {
        this.worldManager.removeEntity(this);
        super.destroy();
    }
    /**
     * Move this entity to a position.
     * You can move to two position in the same time.
     * @param {Boolean} leftRight - true left false right
     * @param {Boolean} upDown - true up false down
     */
    moveLeft() {
        if (this.locks.move) {
            return;
        }
        this.infos.towards = true;
        this.playAnimationRun();
        this.setVelocityX(-this.infos.speed);
    }
    moveRight() {
        if (this.locks.move) {
            return;
        }
        this.infos.towards = false;
        this.playAnimationRun();
        this.setVelocityX(this.infos.speed);
    }

    moveUp() {
        if (this.locks.move) {
            return;
        }
        this.playAnimationRun();
        this.setVelocityY(-this.infos.speed);
    }

    moveDown() {
        if (this.locks.move) {
            return;
        }
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

    /**
     * @param {Object} toword - have.x, .y
     * @returns {Number} - radian
     *  */
    getTowordRadian(toword) {
        const diffX = toword.x - this.x, diffY = toword.y-this.y;
        let radian = Math.atan(diffY / diffX);
        if (diffX < 0) {
            radian += Math.PI;
        }
        return radian;
    }
}