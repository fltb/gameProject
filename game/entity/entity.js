import { Item } from "../item/item.js";

export class Entity extends Phaser.GameObjects.Sprite {

    /**
     * An entity is a Phaser sprite with some actions.
     * 
     * @param {Phaser.Scene} scene - Scene
     * @param {Number} x - x position
     * @param {Number} y - y position
     * @param {String} texture - texture
     * @param {String} infos.name - name of Entity
     * @param {String} infos.type - type of entity
     * @param {Array} infos.states - for collider check with block
     * @param {Number} infos.heart - health for entity
     * @param {Item} [infos.hold]
     */
    constructor(scene, x, y, texture, infos) {
        if (!(
            typeof infos.name === 'string'
        )) {
            throw new Error("Missing nessecery infomations for Entity.");
        }
        super(scene, x, y, texture);

        this.scene = scene;
        
        this.infos = infos;

        scene.exsisting = this;
    }
    /**
     * Will be called while update
     */
    update() {

    }

    onUse() {
        if(this.infos.hold.use) {
            this.infos.hold.use(this);
        }
    }

    /**
     * 
     * @param {Number} damage - Damage to this entity
     */
    onHurt(damage) {
        this.infos.heart -= damage;
        if (this.infos.heart <= 0) {
            this.onDie();
        }
    }

    onDie() {
        super.destroy();
    }

}