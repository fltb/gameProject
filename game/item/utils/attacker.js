import { Entity } from "../../entity/entity.js";
import { WorldManager } from "../../world/WorldManager.js";

class Attacker {

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {WorldManager} worldManager 
     * @param {Entity} owner 
     */
    constructor(scene, worldManager, owner) {
        this.scene = scene;
        this.worldManager = worldManager;
        this.owner = owner;
    }

    attackOnce(radian) {
        let attackerEntity ;
        attackerEntity.setVisible(false);
        qi.rotation = radian;
    }
}