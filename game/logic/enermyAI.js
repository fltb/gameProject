import { Entity } from "../entity/entity";

export class EnermyAI {

    /**
     * A simple AI with some basic logic to control the enermy
     * @param {Phaser.Scene} scene
     * @param {Entity} entity - The entity that this AI controled 
     */
    constructor(scene, entity) {
        this.scene = scene
        this.entity = entity;
    }

    /**
     * 
     * @param {Entity} entity 
     */
    setHateTarget(entity) {
        /**@type {Entity} */
        this.hateTarget = entity;
    }

    startCharseTarget() {

    }

    stopCharseTarget() {

    }

    
    isAttackAble() {

    }
}