import { Entity } from "../entity/entity.js";

export class Item {

    /**
     * 
     * @param {String} texture - image path
     * @param {Number} cd - cd of this item, -1 or 0 is no
     */
    constructor(texture, cd){
        /**@type {String} - img path */
        this.texture = texture;

        /**
         * @typedef CD
         * @type {Object}
         * @property {Number} now
         * @property {Number} total
         */
        /**@type {CD} */
        this.cd = {
            now: 0,
            total: cd,
        }
    }
    /**
     * @param {Entity} caller - caller of this Item
     */
    onUse(caller) {

    }

    /**
     * 
     * @param {Object} bar
     * @param {Node} bar.pic -img node
     * @param {Node} bar.info - div with text
     * @param {Node} bar.cover - div, change height to cover
     */
    onEquip(bar) {

    }

    /**
     * remove from bar
     */
    onRemove() {

    }

    /**
     * @returns {Boolean} - is locking
     */
    isLocking() {
        return this.cd.now > 0;
    }
}