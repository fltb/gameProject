import { Entity } from "../entity/entity.js";

export class Item {

    /**
     * 
     * @param {Phaser.Scene} scene
     * @param {Entity} owner
     * @param {String} texture - image path
     * @param {Number} cd - cd of this item, -1 or 0 is no
     * @param {String} info - infos that displayed when pointer hover on image
     */
    constructor(scene, owner, texture, cd, info){
        this.scene = scene;
        this.owner = owner;
        this.info = info;
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
     * @param {Number} toward - toword radian
     */
    use(caller, toward) {
        if (this.isLocking()) {
            return;
        }
        let that = this;
        that.cd.now = that.cd.total;
        async function cding(ms) {
            while (that.cd.now > 0) {
                await that.sleep(ms);
                that.cd.now -= ms;
                if (that.bar) {
                    that.bar.cover.styles.height = Math.floor(that.cd.now * 100 / that.cd.total) + "%";
                }
            }
            that.cd.now = 0;
            if (that.bar) {
                that.bar.cover.styles.height = "0";
            }
        }
        cding(100);
    }

    /**
     * 
     * @typedef {Object} Bar
     * @property {Node} bar.pic -img node
     * @property {Node} bar.info - div with text
     * @property {Node} bar.cover - div, change height to cover
     */

    /**
     * 
     * @param {Bar} bar
     */
    onEquip(bar) {
        this.bar = bar;
        bar.pic.setAttribute("src", this.texture);
        bar.pic.setAttribute("title", this.info);
        bar.info.textContent = "";
        bar.cover.styles.height = 0;
    }

    /**
     * remove from bar
     */
    onRemove() {
        this.bar.pic.setAttribute("src", "");
        bar.pic.setAttribute("title", "");
        this.bar.info.textContent = ""
        this.bar.cover.styles.height = 0;
        this.bar = undefined;
    }

    /**
     * @returns {Boolean} - is locking
     */
    isLocking() {
        return this.cd.now > 0;
    }


    /** Private functions below
     * @param {Number} time - ms
    */

    sleep(time) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, time)
        })
    }
}